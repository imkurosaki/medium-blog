import Card from "./Card"

export default function SkeletonCard() {
    return <Card>
        <div className="animate-pulse flex space-x-4 px-10 pt-10 pb-4 ">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-4">
                <div className="space-y-1">
                    <div className="h-3 w-2/5 bg-slate-200 rounded-full"></div>
                    <div className="h-3 w-3/5 bg-slate-200 rounded-full"></div>
                </div>
                <div className="space-y-2">
                    <div className="space-y-1">
                        <div className="h-5 w-full bg-slate-200 rounded"></div>
                        <div className="h-5 w-4/5 bg-slate-200 rounded"></div>
                    </div>
                    <div className="space-y-1">
                        <div className="h-2 w-full bg-slate-200 rounded-full"></div>
                        <div className="h-2 w-full bg-slate-200 rounded-full"></div>
                        <div className="h-2 w-3/5 bg-slate-200 rounded-full"></div>
                    </div>
                </div>
                <div className="flex gap-5 pt-6">
                    <div className="h- w-28 bg-slate-200 rounded-full"></div>
                    <div className="h-4 w-20 bg-slate-200 rounded-full"></div>
                </div>
            </div>
        </div>
    </Card>
}