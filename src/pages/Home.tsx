const Home = () => {
  return (
    <main className="container min-h-screen min-w-full max-w-max">
      <div className="bg-home-image bg-no-repeat bg-cover h-96 grid grid-cols-5 grid-rows-3 grid-flow-col shadow-black shadow-2xl">
        <div className="col-start-2 col-end-5 row-start-3 w- h-20 bg-black blur-3xl" />
        <h1 className="text-5xl text-white font-black row-span-2 row-start-3 col-start-2 col-end-5 brightness-200">
          Os melhores albuns, quando precisar
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        conteudo aqui
      </div>
    </main>
  );
};

export default Home;
