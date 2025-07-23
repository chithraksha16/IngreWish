
type badge={
        children:React.ReactNode
    }
const Badge = ({children}:badge) => {
    
return (
    <div className=" sm:text-sm text-xs border border-gray-400 text-gray-200 py-1 px-3 rounded-lg" >
    {children}
    </div>
)
}

export default Badge
