import EditFile from "@/components/EditFile/EditFile";
import Header from "@/components/Header/Header";
import Table from "@/components/Table/Table";

export default async function Home() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Header />
        <hr className="my-8 border-gray-300" />
        <Table />
      </div>
      <EditFile />
    </div>
  );
}
