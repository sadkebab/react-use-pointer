export type ClickAndHoldConfig = {
    onClick?: () => any;
    onDoubleClick?: () => any;
    onHold?: () => any;
    onRightClick?: () => any;
    onRightDoubleClick?: () => any;
    onRightHold?: () => any;
    onMiddleClick?: () => any;
    onMiddleHold?: () => any;
    holdMillis: number;
};
export default function useMouseAndTouchEvents(config: ClickAndHoldConfig): {
    onMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseUp: (event: React.MouseEvent<HTMLElement>) => boolean;
    onTouchStart: (event: React.TouchEvent<HTMLElement>) => void;
    onTouchStop: (event: React.TouchEvent<HTMLElement>) => void;
};
