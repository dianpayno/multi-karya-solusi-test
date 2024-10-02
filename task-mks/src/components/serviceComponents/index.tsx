import { serviceListDataInterface } from "@/Interface/menuInterface";
import React from "react";
import { HiComputerDesktop } from "react-icons/hi2";
import { FaGears } from "react-icons/fa6";
import { FaHammer } from "react-icons/fa6";
import { PiNetworkFill } from "react-icons/pi";

const serviceListData: serviceListDataInterface[] = [
  {
    label: "Software Development",
    icon: <HiComputerDesktop size={50} color="white" />,
    description:
      "Custom Development , Integration, Data Migration & Enhancement & Mobile Application",
  },
  {
    label: "System Integration",
    icon: <FaGears size={50} color="white" />,
    description:
      "Data Center Consolidation , Network & Security & Server and Storage",
  },
  {
    label: "Maintenance & Support",
    icon: <FaHammer size={50} color="white" />,
    description:
      "Offsite Support Staffing , Onsite Support Staffing & Project Based Support",
  },
  {
    label: "Network & Telecommunication",
    icon: <PiNetworkFill size={50} color="white" />,
    description:
      "We will help all the needs of network installation and preparation based on your needs, taking into account what is needed and what is more efficient.",
  },
];

const ServiceProfileComponents = () => {
  return (
    <div className="h-[350px] max-w-full bg-[##F8F7F3] flex justify-center mt-[50px] items-start gap-7">
      {serviceListData.map(
        (serviceItem: serviceListDataInterface, i: number) => {
          return (
            <div
              key={i}
              className="min-h-[300px] border-[1px] border-gray-300 min-w-[300px] py-10 flex justify-start max-w-[300px] flex-col items-center rounded-md"
            >
              <div className="min-h-[100px] min-w-[100px] rounded-full flex justify-center items-center bg-[#17375E]">
                {serviceItem.icon}
              </div>
              <p className="font-semibold my-3">{serviceItem.label}</p>
              <p className="text-center px-3 text-[14px] text-gray-500">
                {serviceItem.description}
              </p>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ServiceProfileComponents;
