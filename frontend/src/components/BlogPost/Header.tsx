

export function Header({name, day, month, year}: HeaderPost) {
    return <div className="space-y-1">
        <div className="h-3 text-sm font-medium cursor-pointer">{name}</div>
        <div className="h-3 text-sm font-thin">{day} - {month} - {year}</div>
    </div>
}

export function Profile(props: {firstLetter: string}) {
    return <div className="rounded-full bg-slate-200 h-10 w-10 flex items-center justify-center capitalize cursor-pointer"><p>{props.firstLetter}</p></div>
}