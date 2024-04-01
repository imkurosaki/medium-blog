import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

export default function Card({children}: Props) {
    return <div className="group cursor-pointer transition ease-in-out hover:-translate-y-1 hover:bg-slate-50 border bg-white border-slate-200 rounded-md w-full mx-auto space-y-10">
        {children}
    </div>
}