
type ButtonFunctionMap = {
    onClick: ()=>any 
    onDoubleClick: ()=>any 
    onHold: ()=>any
}

const CLICK_MILLIS_WINDOW = 100
const CLICK_RESET_wINDOW = 250
const CLICK_EXPIRE_WINDOW = 250
const HOLD_MIN = 300


export type ClickAndHoldConfig = {
    onClick?: ()=>any, 
    onDoubleClick?: ()=> any, 
    onHold?: ()=>any,
    onRightClick?: ()=>any, 
    onRightDoubleClick?: ()=>any, 
    onRightHold?: ()=>any,
    onMiddleClick?: ()=>any,
    onMiddleHold?: ()=>any,
    holdMillis: number,
}

export default function useMouseAndTouchEvents(config: ClickAndHoldConfig){
    config.holdMillis=config.holdMillis>=HOLD_MIN && config.holdMillis || HOLD_MIN
    const {holdMillis} = config;

    const doNothing = () => 0

    const handlers:ButtonFunctionMap[] = [
        {
            onClick: config.onClick ||  doNothing,
            onDoubleClick: config.onDoubleClick ||  doNothing,
            onHold: config.onHold ||  doNothing
        },
        {
            onClick: config.onMiddleClick ||  doNothing,
            onDoubleClick: doNothing,
            onHold: config.onMiddleHold ||  doNothing
        },
        {
            onClick: config.onRightClick ||  doNothing,
            onDoubleClick: config.onRightDoubleClick ||  doNothing,
            onHold: config.onRightHold ||  doNothing
        },
    ]

    let lastStart = 0
    let clickCount = 0
    let clickHoldTimeout = 0
    let clickResetTimeout = 0
    let execTimeout = 0

    const onMouseDown = (event: React.MouseEvent<HTMLElement>) =>{
        clickHoldTimeout = setTimeout(handlers[event.button].onHold, holdMillis)
        clearTimeout(execTimeout)
        clearInterval(clickResetTimeout)
        clickResetTimeout = setTimeout(()=>{clickCount=0}, CLICK_RESET_wINDOW)
        lastStart = Date.now();
        
    }

    const onMouseUp = (event: React.MouseEvent<HTMLElement>) =>{
        clearTimeout(clickHoldTimeout)
        let diff = Date.now()-lastStart

        if(diff>CLICK_EXPIRE_WINDOW) return
        
        clearTimeout(clickResetTimeout)

        if(clickCount == 0){
            execTimeout = setTimeout(()=>{
                handlers[event.button].onClick()
                if(event.button == 1) event.preventDefault()
                clickCount=0
            }, CLICK_MILLIS_WINDOW)
        }else if (clickCount == 1){
            execTimeout = setTimeout(()=>{
                handlers[event.button].onDoubleClick() 
                clickCount=0
            }, CLICK_MILLIS_WINDOW)
        }

        clickCount++
        return false;
    }
    
    let tapHoldTimeout = 0;

    const onTouchStart = (event: React.TouchEvent<HTMLElement>) =>{
        clearTimeout(execTimeout)
        clearTimeout(tapHoldTimeout)
        tapHoldTimeout = setTimeout(handlers[0].onHold, holdMillis)
    }

    const onTouchStop = (event: React.TouchEvent<HTMLElement>) =>{
        clearTimeout(tapHoldTimeout)
    }
    
    return {onMouseDown, onMouseUp, onTouchStart, onTouchStop}
}
