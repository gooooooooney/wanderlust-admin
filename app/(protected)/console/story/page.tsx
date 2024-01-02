import { AuthService } from "@/services/auth.service";
import { DataTableVt } from "./_components/datatable";
import { AddData } from "./_components/addData";

const StoryPage = async () => {
  const self = await AuthService.getSelf()
  
  return (
    <div className="flex flex-col items-end gap-y-4">
      <AddData tags={self.tags} />
      <DataTableVt vts={self.virtualTours || []} />
    </div>
  );
};

export default StoryPage;
