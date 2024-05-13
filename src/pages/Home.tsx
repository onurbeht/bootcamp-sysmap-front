import React, { FormEvent, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { api_albums } from "@/services/apiService";
import { useAuthContext } from "@/hooks/useAuthContext";
import { AlbumModel } from "@/models/AlbumModel";
import { Skeleton } from "@/components/ui/skeleton";
import { BsSearch } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Home = () => {
  const { getToken } = useAuthContext();

  const [newAlbums, setNewAlbums] = useState<AlbumModel[]>([]);
  const [albums, setAlbums] = useState<AlbumModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      await api_albums
        .get("/all?search=" + query)
        .then((res) => setAlbums(res.data))
        .catch((error) => console.log(error));
    }

    return;
  };

  useEffect(() => {
    (async () => {
      api_albums.defaults.headers.common.Authorization = `Bearer ${getToken()}`;

      await api_albums
        .get("/new")
        .then((res) => {
          setNewAlbums(res.data);
        })
        .catch((error) => console.log(error));

      setLoading(false);
      return;
    })();
  }, []);

  console.log(albums);

  return (
    <main className="min-h-screen min-w-full max-w-max">
      {loading ? (
        <div className="mt-10 flex flex-col justify-center items-center space-y-3">
          <Skeleton className="bg-slate-400 h-[325px] w-[500px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className=" bg-slate-400 h-4 w-[500px]" />
            <Skeleton className="bg-slate-400 h-4 w-[450px]" />
          </div>
        </div>
      ) : (
        <>
          <div className="bg-home-image bg-no-repeat bg-cover h-96 grid grid-cols-5 grid-rows-3 grid-flow-col shadow-black shadow-2xl">
            <div className="col-start-2 col-end-5 row-start-3 w- h-20 bg-black blur-3xl" />
            <h1 className="text-5xl text-white font-black row-span-2 row-start-3 col-start-2 col-end-5 brightness-200">
              Os melhores albuns, quando precisar
            </h1>
          </div>
          <div className="container flex flex-col justify-center items-center mt-10 mb-10">
            <h1 className="text-white font-bold text-2xl mb-5">
              Novos lançamentos
            </h1>
            <Carousel
              plugins={[plugin.current]}
              className="max-w-screen-sm"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {newAlbums.map((album) => (
                  <CarouselItem key={album.id} className="basis-2/5">
                    <div className="p-7 h-[300px] w-[300px] flex justify-center">
                      <div
                        style={
                          {
                            "--bg-fundo": `url(${album.images[0].url})`,
                          } as React.CSSProperties
                        }
                        className={`bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-[${album.images[0].width}px] h-[${album.images[0].height}px] rounded-md `}
                      >
                        <div className="bg-black opacity-60 rounded-md w-full h-full flex justify-center items-center">
                          <h1 className="text-white font-bold brightness-200">
                            {album.name}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="container flex justify-center items-center mb-10">
            <form className="flex gap-2 items-center" onSubmit={handleSearch}>
              <input
                type="text"
                value={query}
                placeholder="Nome do artista ou album"
                onChange={(e) => setQuery(e.target.value)}
                className="border-b-2 outline-none bg-transparent p-2 font-bold"
              />
              <Button variant="ghost" size="icon" type="submit">
                <BsSearch />
              </Button>
            </form>
          </div>
          <div className="container flex flex-wrap justify-center items-center mb-10 gap-3">
            {albums?.map((album) => (
              <Card
                style={
                  {
                    "--bg-fundo": `url(${album.images[1].url})`,
                  } as React.CSSProperties
                }
                className={`bg-[image:var(--bg-fundo)] bg-cover bg-no-repeat w-[${album.images[1].width}px] h-[${album.images[1].height}px] rounded-md border-none  `}
              >
                <div className="grid grid-flow-col grid-cols-3 grid-rows-3 backdrop-brightness-100 bg-black/30 w-[300px] h-[300px]">
                  <span className="row-end-3 col-start-2 text-lg font-bold text-white text-end ">
                    {album.name}
                  </span>
                  <span className="row-start-4 row-span-1 col-start-4 text-lg font-bold text-white">
                    R$ {album.value}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
