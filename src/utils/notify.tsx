import { Notify, INotifyOptions } from "notiflix/build/notiflix-notify-aio";

type NotifyType = "error" | "success" | "info" | "warning";

const defaultNotifyStyle: INotifyOptions = {
    position: "right-bottom",
    cssAnimationStyle: "from-right",
    timeout: 3000,
};

export const AlertNotify = (type: NotifyType, message: string) => {
    if (type === "error") {
        Notify.failure(message, defaultNotifyStyle);
    } else if (type === "success") {
        Notify.success(message, defaultNotifyStyle);
    } else if (type === "info") {
        Notify.info(message, defaultNotifyStyle);
    } else {
        Notify.warning(message, defaultNotifyStyle);
    };
};