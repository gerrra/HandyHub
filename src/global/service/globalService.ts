import { useEffect, useLayoutEffect, useRef } from "react";

export const requestApi = (url: string, method: string) => fetch(
    url,
    {
        method,
        // headers: {
        //     'Content-Type': 'application/json',
        // },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети или сервера');
        }
        return response.json();
    })
    .catch(error => {
        console.error(error);
    }
);

export const useMutationObserver = (
    ref: React.MutableRefObject<any>,
    cb: () => any,
    options?: MutationObserverInit,
) => {
    const latestCb = useLatest(cb);

    useEffect(
        () => {
            const element = ref.current;

            if (!element) return;

            const observer = new MutationObserver((...arg) => {
                latestCb.current(...arg);
            });
            observer.observe(element, options);

            return () => observer.disconnect();
        },
        [ref, latestCb, options],
    );
};

export const useLatest = (value: any): React.MutableRefObject<any> => {
    const valueRef = useRef(value);

    useLayoutEffect(
        () => {
            valueRef.current = value;
        },
        [value],
    );

    return valueRef;
};


export const useResizeObserver = (
    ref: React.MutableRefObject<any>,
    cb: (ref: any) => any,
) => {
    const latestCb = useLatest(cb);

    useEffect(
        () => {
            const resizeObserver = new ResizeObserver(([{ target }]) => {
                latestCb.current(target)
            });

            if (ref.current) {
                resizeObserver.observe(ref.current)
            }
        },
        [latestCb, ref],
    );
}

export const smartImageCloudinary = (publicId: string, width: number): string => {
    const base = 'https://res.cloudinary.com/degbwhghr/image/upload';
    const url = `${base}/c_fill,w_${Math.round(width * 3)},q_auto:eco,f_webp/${publicId}`;

    return url;
};