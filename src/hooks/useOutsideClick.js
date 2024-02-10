import { useCallback, useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
    const ref = useRef();

    const handleClick = useCallback(
        (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handler();
            }
        },
        [handler]
    );

    useEffect(
        function () {
            document.addEventListener("click", handleClick, listenCapturing);
            return () =>
                document.removeEventListener(
                    "click",
                    handleClick,
                    listenCapturing
                );
        },
        [handler, handleClick, listenCapturing]
    );
    return ref;
}
