type Props = {
    type: string;
    name: string;
    placeholder: string;
    onChange: (e: any) => void;
}

export default function ({ type, name, placeholder, onChange }: Props) {
    return <div>
        <input type={type} name={name} onChange={onChange} placeholder={placeholder} />
    </div>
}