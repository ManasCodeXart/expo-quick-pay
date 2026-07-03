# expo-quick-pay

A gesture-driven quick-pay bottom sheet — snapping avatar carousel, haptic tick slider, and animated send status — built for fintech apps.

<img width="1280" height="720" alt="quick-pay" src="https://github.com/user-attachments/assets/2ddc9bf6-439c-4229-93ed-915e3b4faa0d" />







## ✨ Features

- 🪙 **Gesture-driven bottom sheet** — pan-to-dismiss with distance *and* velocity thresholds, spring rubber-band back on a cancelled drag
- 🎠 **Snapping avatar carousel** — scale, opacity, and translate all driven by scroll position; parent state is synced to whatever's visually centered both on mount and on every re-open, so what you see is always who gets paid
- 🎚️ **Fully controlled tick slider** — drag with haptic feedback at every snap point, or drive `value` externally and the thumb follows (ignored mid-drag so it never fights your finger)
- ✈️ **Flip-transition status icons** — sending → sent crossfades with a continuous spin, no repeat-boundary jitter
- 🔒 **Race-safe async sends** — a token-based guard cancels stale `onConfirm` resolutions if the sheet closes mid-send
- 🧠 **TypeScript-first** — discriminated `QuickPayStage` union (`'form' | 'sending' | 'sent'`), fully typed props
- ♿ **Accessible by default** — `accessibilityRole` / `accessibilityLabel` on every interactive element

---

## ⚙️ Installation

This isn't published as an npm package — copy the source directly into your project.

```bash
git clone https://github.com/ManasCodeXart/expo-quick-pay
```

Copy `components/`, `constants/`, and `utils/` from `src/` into your project, then install the peer dependencies:

```bash
npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler expo-haptics lottie-react-native
```

> Reanimated 4.x ships its worklets runtime as the separate `react-native-worklets` package — it's required alongside `react-native-reanimated`, not optional.

> Requires `react-native-reanimated`'s Babel plugin already configured, and `GestureHandlerRootView` wrapping your app root — both are standard for any Expo Router / RN project already using Reanimated or Gesture Handler.

---

## 🚀 Usage

```tsx
import { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import QuickPayCard from './components/QuickPayCard';
import type { Contact } from './constants/types';

const CONTACTS: Contact[] = [
  { id: '1', avatar: require('./assets/images/manas2.png'), handle: '@ProyaX' },
  { id: '2', avatar: require('./assets/images/billy.png'), handle: '@RahultDev' },
  { id: '3', avatar: require('./assets/images/boy.png'), handle: '@ManasCodeX' },
];

export function Example() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text>Send Money</Text>
      </TouchableOpacity>

      <QuickPayCard
        visible={visible}
        onClose={() => setVisible(false)}
        contacts={CONTACTS}
        onConfirm={async (amount, contact) => {
          await sendPayment(amount, contact);
        }}
      />
    </>
  );
}
```

## Preview

https://github.com/user-attachments/assets/1ae1c180-f4b6-4967-a5b6-b001bcbff55d

---

## 🧱 Component Anatomy

```
<QuickPayCard>
  ├─ AvatarCarousel     (contact selection)
  ├─ TickSlider         (amount selection)
  └─ SendStatusCard     (sending / sent states)
```

`AvatarCarousel`, `TickSlider`, and `SendStatusCard` are also exported individually if you want to use them outside the card — see the API tables below.

---

## 🧩 API

### `<QuickPayCard>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `visible` | `boolean` | — | Controls open/close. Animates in on `true`, animates out and unmounts on `false`. |
| `onClose` | `() => void` | — | Called on backdrop tap, swipe-to-dismiss, or after a successful send is acknowledged. |
| `contacts` | `readonly Contact[]` | — | Contacts shown in the avatar carousel. Must be non-empty. |
| `initialAmount` | `number` | `1000` | Starting amount, clamped to `[minAmount, maxAmount]`. |
| `onConfirm` | `(amount: number, contact: Contact) => void \| Promise<void>` | — | Called on Confirm tap. If it returns a promise, the card waits for it before showing the "sent" state. |
| `onSendError` | `(error: unknown) => void` | — | Called if the `onConfirm` promise rejects; the card resets to the form stage. |
| `minAmount` | `number` | `100` | Minimum selectable amount. |
| `maxAmount` | `number` | `1800` | Maximum selectable amount. |
| `step` | `number` | `100` | Increment between tick marks. |
| `backgroundSource` | `LottieSource` | built-in subtle background | Background Lottie animation behind the card content. |
| `sendingIconSource` | `FlipIconSource` | built-in plane icon | Front/back frames for the flip animation during `sending`. |
| `sentIconSource` | `FlipIconSource` | built-in checkmark icon | Front/back frames for the flip animation during `sent`. |

### `<AvatarCarousel>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `contacts` | `readonly Contact[]` | — | Must be non-empty. |
| `initialIndex` | `number` | `3` | Index centered on mount. Clamped internally if `contacts.length` is smaller. Fires `onContactChange` once on mount with whichever contact ends up centered, so parent state always matches the UI. |
| `onContactChange` | `(contact: Contact) => void` | — | Fires on mount and on every scroll snap. |
| `height` | `number` | `120` | Height of the carousel track. |

### `<TickSlider>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | — | Fully controlled. External changes move the thumb, except mid-drag. |
| `onValueChange` | `(value: number) => void` | — | Fires on every snap while dragging. |
| `min` | `number` | `100` | Minimum value. |
| `max` | `number` | `1800` | Maximum value. |
| `step` | `number` | `100` | Increment between ticks. |

### `<SendStatusCard>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `stage` | `'sending' \| 'sent'` | — | Which state to render. |
| `sendingIconSource` | `FlipIconSource` | built-in plane icon | — |
| `sentIconSource` | `FlipIconSource` | built-in checkmark icon | — |

### Types

```ts
interface Contact {
  readonly id: string;
  readonly avatar: ImageSourcePropType;
  readonly handle: string;
  readonly name?: string; // reserved — not rendered by the component today
}

interface FlipIconSource {
  readonly front: ImageSourcePropType;
  readonly back: ImageSourcePropType;
}
```

---

## 🔤 Fonts

Text elements use the **Space Grotesk** family (`SpaceGroteskMedium`, `SpaceGroteskSemiBold`, `SpaceGroteskBold`) by name. If you don't load these yourself via `expo-font` / `useFonts`, React Native falls back to the system font silently — everything still works, you'll just get system-font weights instead of Space Grotesk. Load the family under those exact names if you want the intended look.

---

## 📄 License

MIT — see [LICENSE](./LICENSE).

---

## 🧱 Stack

[Expo SDK 56](https://expo.dev/changelog) · [React Native 0.85](https://reactnative.dev/) · [Reanimated 4.3](https://docs.swmansion.com/react-native-reanimated/) · [React Native Worklets 0.8](https://docs.swmansion.com/react-native-reanimated/) · [Gesture Handler 2.31](https://docs.swmansion.com/react-native-gesture-handler/) · [Lottie React Native 7.3](https://github.com/lottie-react-native/lottie-react-native) · Expo Haptics
