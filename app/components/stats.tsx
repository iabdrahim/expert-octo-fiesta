import { NextFont } from "next/dist/compiled/@next/font";

export function Stats({font,followers, stars, wakatime, views}:{font:NextFont,followers:string, stars:number|string, wakatime:string, views:string|number}){
    return (
        <div className="stats my-12">
        <h2 className={font.className + " text-lg max-md:text-base mb-4"}>
          Random stats about me
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="age block overflow-hidden rounded-2xl bg-white/5 p-3 shadow-surface-elevation-low transition duration-300 hover:bg-white/10 hover:shadow-surface-elevation-medium focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70 px-4">
            <p className="text-sm text-rose-100/90 transition duration-300 line-clamp-2 hover:text-rose-100/90">
              My age
            </p>
            <h3 className="text-lg mt-2 text-rose-100/90 transition duration-300 line-clamp-2 hover:text-rose-100/90 font-bold">
              17.9998765
            </h3>
          </div>
          <div className="github block overflow-hidden rounded-2xl bg-white/5 p-3  shadow-surface-elevation-low transition duration-300 hover:bg-white/10 hover:shadow-surface-elevation-medium focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70 px-4">
            <p className="text-sm text-rose-100/90 transition duration-300 line-clamp-2 hover:text-rose-100/90">
              github Folowers
            </p>
            <h3 className="text-lg mt-2 text-rose-100/90 transition duration-300 line-clamp-2 hover:text-rose-100/90 font-bold">
              {followers || "null ):"}
            </h3>
          </div>
          <div className="wt block overflow-hidden rounded-2xl bg-white/5 p-3 shadow-surface-elevation-low transition duration-300 hover:bg-white/10 hover:shadow-surface-elevation-medium focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70 px-4">
            <p className="text-sm text-rose-100/90 transition duration-300 line-clamp-2 hover:text-rose-100/90">
              coding hours
            </p>
            <h3 className="text-lg mt-2 text-rose-100/90 transition duration-300 line-clamp-2 hover:text-rose-100/90 font-bold ">
              {wakatime || "null ):"}
            </h3>
          </div>
          <div className="wt block overflow-hidden rounded-2xl bg-white/5 p-3 shadow-surface-elevation-low transition duration-300 hover:bg-white/10 hover:shadow-surface-elevation-medium focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70 px-4">
            <p className="text-sm text-rose-100/90 transition duration-300 line-clamp-2 hover:text-rose-100/90">
              github stars
            </p>
            <h3 className="text-lg mt-2 text-rose-100/90 transition duration-300 line-clamp-2 hover:text-rose-100/90 font-bold ">
              {stars || "null ):"}
            </h3>
          </div>
          <div className="wt block overflow-hidden rounded-2xl bg-white/5 p-3 shadow-surface-elevation-low transition duration-300 hover:bg-white/10 hover:shadow-surface-elevation-medium focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70 px-4">
            <p className="text-sm text-rose-100/90 transition duration-300 line-clamp-2 hover:text-rose-100/90">
              site views
            </p>
            <h3 className="text-lg mt-2 text-rose-100/90 transition duration-300 line-clamp-2 hover:text-rose-100/90 font-bold ">
              {views || "null ):"}
            </h3>
          </div>
        </div>
      </div>
    )
}