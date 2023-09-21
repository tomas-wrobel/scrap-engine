class Messages extends EventTarget {
    listeners: Messages.Listener[] = [];
}

declare namespace Messages {
    type Listener = {
        msg: string;
        listenerId: string;
    };

    type Event = CustomEvent<string>;

    type DoneEvent = CustomEvent<{
        listenerId: string;
        msgId: string;
    }>;
}

export default Messages;