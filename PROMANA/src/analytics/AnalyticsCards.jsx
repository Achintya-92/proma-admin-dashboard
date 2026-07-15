export default function AnalyticsCards({totalProducts,totalInventoryValue,averageRating}) {
    const cardStyles = [
    "bg-gradient-to-br from-blue-500 to-indigo-600 text-white",
    "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
    "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
    ];
  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <Cards title={"Total Producs"} value={totalProducts} gradient={cardStyles[0]}/>
        <Cards title={"Average Rating"} value={averageRating.toFixed(2)} gradient={cardStyles[1]}/>
        <Cards title={"Total Inventory Value"} value={totalInventoryValue} gradient={cardStyles[2]}/>
    </div>
    </div>
  )
}


function Cards({title,value,gradient}){
return(
  <div className={`${gradient} text-white rounded-2xl p-8 lg:p-16  shadow-lg hover:scale-105 transition`}>
    <p className="text-sm text-blue-100">
      {title}
    </p>

    <h2 className="mt-2 text-3xl font-bold">
      {value}
    </h2>
  </div>
)
}