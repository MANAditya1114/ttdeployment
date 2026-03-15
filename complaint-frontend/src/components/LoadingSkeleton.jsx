function LoadingSkeleton(){

return(

<div className="animate-pulse space-y-4">

{/* Title */}

<div className="h-6 bg-gray-300 rounded w-48"></div>

{/* Cards */}

<div className="grid grid-cols-4 gap-6">

<div className="h-24 bg-gray-300 rounded-xl"></div>
<div className="h-24 bg-gray-300 rounded-xl"></div>
<div className="h-24 bg-gray-300 rounded-xl"></div>
<div className="h-24 bg-gray-300 rounded-xl"></div>

</div>

{/* Chart */}

<div className="h-64 bg-gray-300 rounded-xl"></div>

{/* Table */}

<div className="space-y-3">

<div className="h-6 bg-gray-300 rounded"></div>
<div className="h-6 bg-gray-300 rounded"></div>
<div className="h-6 bg-gray-300 rounded"></div>
<div className="h-6 bg-gray-300 rounded"></div>

</div>

</div>

);

}

export default LoadingSkeleton;