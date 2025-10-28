import Header from "../component/Header";
import Navbar from "../component/Navbar";

export default function Home(){

    return(
        <>
     <div className=" flex flex-col items-center justify-center min-h-screen bg-[url('/photos/bg_img.png')] bg-cover bg-center">
          <Navbar/>
          <Header/>
     </div>
        </>
    )
}