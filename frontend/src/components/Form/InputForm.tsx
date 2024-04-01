import { useState } from "react";

type Props = {
    type: string;
    name: string;
    placeholder: string;
    onChange: (e: any) => void;
}

export default function ({ type, name, placeholder, onChange }: Props) {
    const [flag, setFlag] = useState(false);

    return <div className="relative z-0 w-full group">
        <label className={`${flag ? "top-3" : "top-8"} duration-200 text-sm font-medium text-gray-800 relative px-1 left-3 w-auto bg-white group-focus-within:top-3 group-focus-within:border-1`}>
            {placeholder}
        </label>
        <input
            type={type}
            name={name}
            onChange={(e: any) => {
                onChange(e);
                setFlag(true);
            }}
            className="h-8 text-[11px] border py-5 border-gray-500  text-sm rounded-lg focus:outline-none block w-full px-2.5" />
    </div>
}