import Slider from "@/components/slider/slider";
import login from "./login.module.scss";
import { imageList } from "./imageList";

export default function Login() {
  return (
    <>
      <div className={login.container}>
        <div className={login.card}>
          <Slider images={imageList}></Slider>
          <div className={login.content}>
            <h3>Card 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </>
  );
}
