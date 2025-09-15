function NotFoundPage() {
  return (
    <div className="flex flex-col items-center mt-30">
      <img
        src="src\assets\notfound.svg"
        alt=""
        className="w-60 h-auto md:w-100 lg:w-140"
      />
      <h1 className="text-2xl font-bold mt-20">Page Not Found</h1>
    </div>
  );
}

export default NotFoundPage;
