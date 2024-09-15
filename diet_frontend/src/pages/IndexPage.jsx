import DietForm from "../components/DietForm";

export default function IndexPage() {
  return (
    <>
      <div
        id="diet-analysis-form"
        className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: `url('/background.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <DietForm />
      </div>
    </>
  );
}
