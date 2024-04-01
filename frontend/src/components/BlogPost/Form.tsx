import { ChangeEvent, useRef } from "react";

export function InputTitle({ name, placeholder, onChange }: Props) {
    const ref = useRef<HTMLTextAreaElement>(null);
    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${e.target.scrollHeight - 16}px`;
        }
    };

    return (
        <textarea
            ref={ref}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onInput={handleInput}
            className="w-full py-4 font-semibold placeholder:text-zinc-400 overflow-y-hidden text-5xl resize-none outline-none"
        />
    )
}


export function InputContent({ name, placeholder, onChange }: Props) {
    const ref = useRef<HTMLTextAreaElement>(null);
    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${e.target.scrollHeight - 16}px`;
        }
    };

    return <div>
        <textarea
            ref={ref}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onInput={handleInput}
            className="w-full py-4 text-lg placeholder:text-zinc-400 placeholder:tracking-widest overflow-y-hidden outline-none resize-none"
        />
    </div>
}