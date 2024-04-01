

export default function SkeletonPost() {
    return <div className="animate-pulse space-y-6 px-16 pt-10 pb-4 border bg-white border-slate-200 rounded-md w-full mx-auto">
        <div className="flex space-x-4 ">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-4">
                <div className="space-y-1">
                    <div className="h-5 w-64 bg-slate-200 rounded"></div>
                    <div className="h-5 w-36 bg-slate-200 rounded"></div>
                </div>
            </div>
        </div>
        <div className="space-y-12">
            <div className="space-y-2">
                <div className="h-5 w-full bg-slate-200 rounded"></div>
                <div className="h-5 w-2/3 bg-slate-200 rounded"></div>
            </div>
            <div className="space-y-2">
                <div className="h-5 w-full bg-slate-200 rounded"></div>
                <div className="h-5 w-full bg-slate-200 rounded"></div>
                <div className="h-5 w-full bg-slate-200 rounded"></div>
                <div className="h-5 w-2/3 bg-slate-200 rounded"></div>
                <div className="px-28 py-6">
                    <div className="h-56 w-full bg-slate-200 rounded"></div>
                </div>
                <div className="h-5 w-full bg-slate-200 rounded"></div>
                <div className="h-5 w-full bg-slate-200 rounded"></div>
                <div className="h-5 w-full bg-slate-200 rounded"></div>
                <div className="h-5 w-2/3 bg-slate-200 rounded"></div>
            </div>
        </div>
    </div>
}