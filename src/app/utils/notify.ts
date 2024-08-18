import { IReportOptionsSecondary } from "notiflix";
import { Notify, INotifyOptions } from "notiflix/build/notiflix-notify-aio";

type NotifyType = "error" | "success" | "info" | "warning";

const defaultNotifyStyle: INotifyOptions = {
    position: "right-bottom",
    cssAnimationStyle: "from-right",
    timeout: 3000,
    messageMaxLength: 200,
};

const secondaryNotifyStyle: IReportOptionsSecondary = {
    svgColor: "#fff",
};

export const showNotify = (type: NotifyType, message: string) => {
    if (type === "error") {
        Notify.failure(message, {...defaultNotifyStyle, ...secondaryNotifyStyle});
    } else if (type === "success") {
        Notify.success(message, {...defaultNotifyStyle, ...secondaryNotifyStyle});
    } else if (type === "info") {
        Notify.info(message, {...defaultNotifyStyle, ...secondaryNotifyStyle});
    } else {
        Notify.warning(message, {...defaultNotifyStyle, ...secondaryNotifyStyle});
    };
};