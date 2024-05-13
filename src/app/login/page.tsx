"use client"
import Slider from "@/components/slider/slider";
import login from "./login.module.scss";
import { imageList } from "./imageList";
import FormLogin from "@/components/form-login/form-login";
import Button from "@/components/button/button";
import { FormProvider } from "@/components/form-data-provider/form-data-provider";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const goToReservation = () => {
    router.push("/reservation");
  };
  return (
    <>
      <div className={login.container}>
        <div className={login.card}>
          <Slider customClassName={login.slider} images={imageList}></Slider>
          <div className={login.content}>
            <FormProvider>
              <FormLogin>
                <Button onClick={goToReservation}>
                  Let's go!
                  <br />
                  Choose your dream vacation
                </Button>
              </FormLogin>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
}
