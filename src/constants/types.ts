import type LottieView from 'lottie-react-native';
import type { ComponentProps } from 'react';
import type { ImageSourcePropType } from 'react-native';

export interface FlipIconSource {
  readonly front: ImageSourcePropType;
  readonly back: ImageSourcePropType;
}

export type LottieSource = ComponentProps<typeof LottieView>['source'];

export interface Contact {
  readonly id: string;
  readonly avatar: ImageSourcePropType;
  readonly handle: string;
  readonly name?: string;
}



export interface AvatarCarouselProps {
  readonly contacts: readonly Contact[];
  readonly initialIndex?: number;
  readonly onContactChange: (contact: Contact) => void;
  readonly height?: number;
}



export interface TickSliderProps {
  readonly value: number;
  readonly onValueChange: (value: number) => void;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
}


export type SendStage = 'sending' | 'sent';

export interface SendStatusCardProps {
  readonly stage: SendStage;
  readonly sendingIconSource?: FlipIconSource;
  readonly sentIconSource?: FlipIconSource;
}



export type QuickPayStage = 'form' | SendStage;

export interface QuickPayCardProps {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly contacts: readonly Contact[];
  readonly initialAmount?: number;
  readonly onConfirm?: (amount: number, contact: Contact) => void | Promise<void>;
  readonly onSendError?: (error: unknown) => void;
  readonly minAmount?: number;
  readonly maxAmount?: number;
  readonly step?: number;
  readonly sendingIconSource?: FlipIconSource;
  readonly sentIconSource?: FlipIconSource;
  readonly backgroundSource?: LottieSource;
}