"use client";

import { FC, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardWidget from "../../components/Admin/Widgets/DashboardWidget";

type Props = {
  isDashboard?: boolean;
};

const DashboardHero: FC<Props> = ({ isDashboard }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />
      {isDashboard && <DashboardWidget open={open} />}
    </div>
  );
};

export default DashboardHero;
