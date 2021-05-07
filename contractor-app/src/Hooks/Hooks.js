import { useCallback, useEffect, useRef } from "react";

export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export function useRefWithChangeHandler(onChange, runOnce) {
    const ref = useRef(null)
    const setRef = useCallback(node => {
        if (ref.current && runOnce)
            return;
        onChange(node);
        ref.current = node
    }, [])
    return [setRef]
}

export function useRefWithMountHandler(onChange) {
    return useRefWithChangeHandler(onChange, true);
}