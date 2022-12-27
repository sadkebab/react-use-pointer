# useMouseAndTouchEvents

A simple react hook that returns handlers for onMouseDown, onMouseUp, onTouchStart and onTouchEnd that allows you to have a consistent behavious of click events between mouse and touch screen.

## How to use
```
export function MonkeyButton(){
    const hold = 2000

    const onClick = ()=>{
        console.log('click')
    }

    const onDoubleClick = ()=>{
        console.log('doubleClick')
    }

    const onHold = ()=>{
        console.log(`pressed for ${hold} millis`)
    }
    
    let config: ClickAndHoldConfig = {
        onClick:onClick, 
        onDoubleClick:onDoubleClick, 
        onHold:onHold,
        holdMillis:hold
    }

    const clickAndHold = useMouseAndTouchEvents(config);
    
    return (
        <div >
        <button 
            title="Click me" 
            className={`shadow-sm select-none shadow-slate-600/50 
                        w-10 bg-purple-300 rounded p-2 text-slate-600
                        font-bold active:scale-95 active:shadow-inner`} 
            type="button"
            onMouseDown = {clickAndHold.onMouseDown}
            onMouseUp = {clickAndHold.onMouseUp}
            onTouchStart = {clickAndHold.onTouchStart}
            onTouchEnd = {clickAndHold.onTouchStop}
            onContextMenu = {(e)=>e.preventDefault()}
            >
                🙊
        </button>
        </div>
    )
}
```

## Supported callbacks
* onClick
* onDoubleClick
* onHold
* onMiddleClick
* onMiddleHold
* onRightClick
* onRightDoubleClick
* onRightHold

### Warnings

* By default, a long touch will pop up the context menu so remember to set ```onContextMenu = {(e)=>e.preventDefault()}``` if you don't want surprises
* I put 3-4 hours of effort on this thing and for only two very specific uses cases that I had in one of my projects so it may have many hidden issues


## TO DO
* put on npm
* make the configuration of click handlers functional
