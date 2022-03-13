import { NextPage } from "next"

type LoadingCardProps = {
    pulsating: boolean
    title: string
}

const LoadingCard: NextPage<LoadingCardProps> = ({pulsating, title}: LoadingCardProps) => {
    return (
        <div className="w-full h-full flex items-center justify-center">
                <div className="border border-blue-300 bg-white shadow rounded-md p-4 max-w-sm w-full mx-auto">
                  <div className={`${pulsating && "animate-pulse" } flex flex-col space-x-4`}>
                    <h3 className="w-full h-max text-center">
                      {title}
                    </h3>
                    <div className="m-6 rounded-full bg-black h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-black rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-black rounded col-span-2"></div>
                          <div className="h-2 bg-black rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-black rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    )
}

export default LoadingCard