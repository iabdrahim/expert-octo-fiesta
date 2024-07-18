import { ProjectsSection } from "./components/projects";
import { Rammetto_One } from "next/font/google";

export const Rammetto = Rammetto_One({ subsets: ["latin"], weight: "400" });

let getGithub = async () => {
  const me = await fetch("https://api.github.com/users/abdrahiman");
  const repos = await fetch(
    "https://api.github.com/users/abdrahiman/repos?per_page=100"
  );

  const meJson = await me.json();
  const reposJson = await repos.json();
  const mine = reposJson.filter((repo: any) => !repo.fork);
  const stars = mine.reduce(
    (acc: any, curr: any) => acc + curr.stargazers_count,
    0
  );
  return { followers: meJson.followers, stars };
};
let getwakatime = async () => {
  const resp = await fetch(
    "https://wakatime.com/api/v1/users/current/all_time_since_today",
    {
      headers: {
        Authorization: `Basic ${process.env.WAKATIME_KEY || ""}`,
      },
    }
  );
  const response = await resp.json();
  return response.data.text || "";
};
let getviews = async () => {
  const resp = await fetch(
    "https://api.jsonbin.io/v3/b/6699125ead19ca34f8896306",
    {
      headers: {
        "X-Master-Key":
          process.env.BIN_KEY || "",
      },
    }
  );
  const response = await resp.json();
  fetch("https://api.jsonbin.io/v3/b/6699125ead19ca34f8896306", {
    method: "PUT",
    body: JSON.stringify({ views: +response.record.views++ }),
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": process.env.BIN_KEY||"",
    },
  });
  return +response.record.views++ || "";
};

export default async function Home() {
  let { followers, stars } = await getGithub();
  let wakatime = await getwakatime();
  let views = await getviews();
  return (
    <>
      <header className="flex flex-row gap-4 mb-16 items-center max-md:flex-col max-md:items-start">
        <div
          className="image w-fit h-fit min-w-fit
        rounded-full bg-gradient-to-tl from-purple-700/80 to-rose-400/80 p-1 shadow-lg ring-[5px] ring-purple-500/10 "
        >
          <img
            className="rounded-full h-28 w-28 max-md:h-24 max-md:w-24 z-10 relative "
            src="https://avatars.githubusercontent.com/u/108197963?v=4"
            alt="my avatar"
          />
        </div>
        <div className="info">
          <h1 className={Rammetto.className + " text-2xl max-md:text-xl"}>
            Abdrahimo
          </h1>
          <p className="text-sm mt-2 text-gray-200 font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            modi, doloremque officia quia maiores eius nesciunt.
          </p>
          <div className="socails flex flex-row gap-4 max-md:gap-2 max-md:scale-95 flex-wrap mt-4 relative ">
            <a
              className="sm:flex sm:items-center sm:space-x-2 hover:z-10"
              href="#"
            >
              <div className="mb-1.5 flex justify-center sm:mb-0 sm:block ">
                <div className="rounded-lg bg-gradient-to-tl from-purple-500/80 to-rose-400/80 p-1 shadow-lg transition-all duration-300 ease-out hover:scale-[1.2] hover:rounded-[10px] shadow-purple-500/40 active:translate-y-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-[16px] transform text-rose-100 transition delay-100 duration-500 ease-out hover:scale-110"
                  >
                    <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z"></path>
                  </svg>
                </div>
              </div>
              <div className="transition-colors hover:text-rose-50 font-semibold ">
                Videos
              </div>
            </a>
            <a
              className="sm:flex sm:items-center sm:space-x-2 hover:z-10"
              href="#"
            >
              <div className="mb-1.5 flex justify-center sm:mb-0 sm:block ">
                <div className="rounded-lg bg-gradient-to-tl from-purple-500/80 to-rose-400/80 p-1 shadow-lg transition-all duration-300 ease-out hover:scale-[1.2] hover:rounded-[10px] shadow-purple-500/40 active:translate-y-1">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[16px] transform text-rose-100 transition delay-100 duration-500 ease-out hover:scale-110"
                  >
                    <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path>
                  </svg>{" "}
                </div>
              </div>
              <div className="transition-colors hover:text-rose-50 font-semibold ">
                Github
              </div>
            </a>
            <a
              className="sm:flex sm:items-center sm:space-x-2 hover:z-10"
              href="#"
            >
              <div className="mb-1.5 flex justify-center sm:mb-0 sm:block ">
                <div className="rounded-lg bg-gradient-to-tl from-purple-500/80 to-rose-400/80 p-1 shadow-lg transition-all duration-300 ease-out hover:scale-[1.2] hover:rounded-[10px] shadow-purple-500/40 active:translate-y-1 flex justify-center itmes-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 500 530"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[16px] transform text-rose-100 transition delay-100 duration-500 ease-out hover:scale-110"
                  >
                    <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
                  </svg>
                </div>
              </div>
              <div className="transition-colors hover:text-rose-50 font-semibold ">
                Facebook
              </div>
            </a>
            <a
              className="sm:flex sm:items-center sm:space-x-2 hover:z-10"
              href="#"
            >
              <div className="mb-1.5 flex justify-center sm:mb-0 sm:block ">
                <div className="rounded-lg bg-gradient-to-tl from-purple-500/80 to-rose-400/80 p-1 shadow-lg transition-all duration-300 ease-out hover:scale-[1.2] hover:rounded-[10px] shadow-purple-500/40 active:translate-y-1">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[16px] transform text-rose-100 transition delay-100 duration-500 ease-out hover:scale-110"
                  >
                    <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z"></path>
                  </svg>{" "}
                </div>
              </div>
              <div className="transition-colors hover:text-rose-50 font-semibold ">
                Instagram
              </div>
            </a>
          </div>
        </div>
      </header>
      <ProjectsSection />
      <div className="stats my-12">
        <h2 className={Rammetto.className + " text-lg max-md:text-base mb-4"}>
          Technologies i have used recently
        </h2>
        <img
          src="https://skillicons.dev/icons?i=flutter,python,cpp,sass,react,svelte,nextjs,nestjs,express,tailwindcss,figma,vim,git"
          alt="Technologies icons"
        />
      </div>
      <div className="stats my-12">
        <h2 className={Rammetto.className + " text-lg max-md:text-base mb-4"}>
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
      <hr className="bg-gradient-to-tl from-purple-700/50 to-rose-400/50 h-[1.8px] border-none" />
      <footer className="flex w-full justify-between item-center text-sm mt-4 ">
        <p>Devleoped with ❤️ in Morocco.</p>
        <p>copyright © 2024.</p>
      </footer>
    </>
  );
}