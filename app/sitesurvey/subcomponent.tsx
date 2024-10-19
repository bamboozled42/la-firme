import DeleteDialog from "./delete-subcomponent";
import EditDialog from "./edit-subcomponent";



export default function Subcomponent({ name }: { name: string }) {
    return (
      <div className="mt-2 rounded-lg bg-secondary pl-4 p-3 flex justify-between items-center flex-wrap">
        {name}
        <div>
            <EditDialog/>
            <DeleteDialog/>
        </div>
      </div>
    );
  }