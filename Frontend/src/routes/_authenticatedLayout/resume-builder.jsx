import {
  createFileRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AddCircle } from "iconsax-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks";
import { useResume } from "@/contexts/ResumeContext";
import {
  Specialized1,
  Specialized2,
  Specialized3,
} from "@/components/Resume/Templates";
import InputForm from "@/components/Resume/InputForm";
import ResumePreview from "@/components/Resume/ResumePreview";
import Dropdown from "@/components/Resume/Dropdown";
import Toggle from "@/components/Toggle";
import TemplatesSelectionModal from "@/components/Resume/Modals/TemplatesSelectionModal";
import SettingsModal from "@/components/Resume/Modals/SettingsModal";
import { toast } from "sonner";
import PageParent from "@/layout/PageParent";

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTabResume, setActiveTabResume] = useLocalStorage(
    "activeTabResume",
    "personalInfo",
  );
  const { state, handleAdd, handleVisibility } = useResume();

  const tabsData = [
    { key: "personalInfo", name: "Personal Info" },
    { key: "education", name: "Education" },
    { key: "technicalSkills", name: "Technical Skills" },
    { key: "internships", name: "Internships" },
    { key: "summerTraining", name: "Summer Training" },
    { key: "achievements", name: "Achievements" },
    { key: "projects", name: "Projects" },
    { key: "certifications", name: "Certifications" },
    { key: "extraCurricularActivities", name: "Extra Curricular Activities" },
  ];

  const options = {
    personalInfo: { add: false, remove: false, reset: true },
    education: { add: true, remove: true, reset: true },
    projects: { add: true, remove: true, reset: true },
    certifications: { add: true, remove: true, reset: true },
    achievements: { add: true, remove: true, reset: true },
    internships: { add: true, remove: true, reset: true },
    summerTraining: { add: true, remove: true, reset: true },
    extraCurricularActivities: { add: true, remove: true, reset: true },
    technicalSkills: { add: true, remove: true, reset: true },
  };

  const inputFields = {
    personalInfo: [
      {
        label: "Name",
        type: "text",
        key: "name",
        value: "",
        icon: { name: "User", lib: "lucide" },
      },
      {
        label: "Email",
        type: "email",
        key: "email",
        value: "",
        icon: { name: "Mail", lib: "lucide" },
      },
      {
        label: "Phone",
        type: "tel",
        key: "phone",
        value: "",
        icon: { name: "Phone", lib: "lucide" },
      },
      {
        label: "Address",
        type: "address",
        key: "address",
        value: "",
        icon: { name: "MapPin", lib: "lucide" },
      },
      {
        label: "Github",
        type: "link",
        key: "github",
        value: "",
        icon: { name: "Github", lib: "lucide" },
      },
      {
        label: "Portfolio",
        type: "link",
        key: "portfolio",
        value: "",
        icon: { name: "CircleUser", lib: "lucide" },
      },
      {
        label: "LinkedIn",
        type: "link",
        key: "linkedin",
        value: "",
        icon: { name: "Linkedin", lib: "lucide" },
      },
      {
        label: "Position",
        type: "text",
        key: "position",
        value: "",
        icon: { name: "Briefcase", lib: "lucide" },
      },
    ],
    education: [
      {
        label: "Degree",
        type: "text",
        key: "education-degree",
        value: "",
        icon: { name: "GraduationCap", lib: "lucide" },
      },
      {
        label: "Institute",
        type: "text",
        key: "education-institute",
        value: "",
        icon: { name: "University", lib: "lucide" },
      },
      {
        label: "Location",
        type: "text",
        key: "education-location",
        value: "",
        icon: { name: "MapPin", lib: "lucide" },
      },
      {
        label: "Score",
        type: "text",
        key: "education-score",
        value: "",
        icon: { name: "Award", lib: "lucide" },
      },
      {
        label: "Score Type",
        type: "dropdown",
        key: "education-scoreType",
        value: "",
        options: { cgpa: "CGPA", percentage: "Percentage" },
      },
      {
        label: "Date",
        type: "text",
        key: "education-date",
        value: "",
        icon: { name: "Calendar", lib: "lucide" },
      },
    ],
    internships: [
      {
        label: "Company",
        type: "text",
        key: "internship-company",
        value: "",
        icon: { name: "Building", lib: "lucide" },
      },
      {
        label: "Role",
        type: "text",
        key: "internship-role",
        value: "",
        icon: { name: "Briefcase", lib: "lucide" },
      },
      {
        label: "Location",
        type: "text",
        key: "internship-location",
        value: "",
        icon: { name: "MapPin", lib: "lucide" },
      },
      {
        label: "Date",
        type: "text",
        key: "internship-date",
        value: "",
        icon: { name: "Calendar", lib: "lucide" },
      },
      {
        label: "Description",
        type: "textArea",
        key: "internship-description",
        value: "",
      },
    ],
    summerTraining: [
      {
        label: "Title",
        type: "text",
        key: "summerTraining-title",
        value: "",
        icon: { name: "BookType", lib: "lucide" },
      },
      {
        label: "Organization",
        type: "text",
        key: "summerTraining-organization",
        value: "",
        icon: { name: "Building", lib: "lucide" },
      },
      {
        label: "Location",
        type: "text",
        key: "summerTraining-location",
        value: "",
        icon: { name: "MapPin", lib: "lucide" },
      },
      {
        label: "Date",
        type: "text",
        key: "summerTraining-date",
        value: "",
        icon: { name: "Calendar", lib: "lucide" },
      },
      {
        label: "Description",
        type: "textArea",
        key: "summerTraining-description",
        value: "",
      },
    ],
    achievements: [
      {
        label: "Title",
        type: "text",
        key: "achievement-title",
        value: "",
        icon: { name: "BookType", lib: "lucide" },
      },
      {
        label: "Date",
        type: "text",
        key: "achievement-date",
        value: "",
        icon: { name: "Calendar", lib: "lucide" },
      },
      {
        label: "Description",
        type: "textArea",
        key: "achievement-description",
        value: "",
      },
    ],
    extraCurricularActivities: [
      {
        label: "Activity",
        type: "text",
        key: "activity",
        value: "",
        icon: { name: "PencilRuler", lib: "lucide" },
      },
      {
        label: "Date",
        type: "text",
        key: "activity-date",
        value: "",
        icon: { name: "Calendar", lib: "lucide" },
      },
    ],
    technicalSkills: [
      {
        label: "Domain",
        type: "text",
        key: "domain",
        value: "",
        icon: { name: "CodeXml", lib: "lucide" },
      },
      {
        label: "Skill",
        type: "text",
        key: "skill",
        value: "",
        icon: { name: "Binary", lib: "lucide" },
      },
    ],
    projects: [
      {
        label: "Title",
        type: "text",
        key: "project-title",
        value: "",
        icon: { name: "BookType", lib: "lucide" },
      },
      {
        label: "Domain",
        type: "text",
        key: "project-domain",
        value: "",
        icon: { name: "CodeXml", lib: "lucide" },
      },
      {
        label: "Technologies",
        type: "text",
        key: "project-technologies",
        value: "",
        icon: { name: "Binary", lib: "lucide" },
      },
      {
        label: "Date",
        type: "text",
        key: "project-date",
        value: "",
        icon: { name: "Calendar", lib: "lucide" },
      },
      {
        label: "Description",
        type: "textArea",
        key: "project-description",
        value: "",
      },
    ],
    certifications: [
      {
        label: "Title",
        type: "text",
        key: "certification-title",
        value: "",
        icon: { name: "BookType", lib: "lucide" },
      },
      {
        label: "Issued By",
        type: "text",
        key: "certification-issuedBy",
        value: "",
        icon: { name: "Building", lib: "lucide" },
      },
      {
        label: "Link",
        type: "text",
        key: "certification-link",
        value: "",
        icon: { name: "Link", lib: "lucide" },
      },
      {
        label: "Date",
        type: "text",
        key: "certification-date",
        value: "",
        icon: { name: "Calendar", lib: "lucide" },
      },
    ],
  };

  const currentFields = inputFields[activeTabResume] || [];
  const transformedField = currentFields.map((field) => ({
    ...field,
    key: field.key + "-" + Math.random().toString(36).substring(7),
  }));

  useEffect(() => {
    if (
      activeTabResume === "personalInfo" &&
      state[activeTabResume].length === 0
    ) {
      handleAdd(activeTabResume, transformedField);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ResumeTemplatesData = [
    { label: "Specialized1", component: <Specialized1 /> },
    { label: "Specialized2", component: <Specialized2 /> },
    { label: "Specialized3", component: <Specialized3 /> },
  ];

  const [selectedTemplate, setSelectedTemplate] = useLocalStorage(
    "selectedTemplate",
    "Specialized1",
  );

  const [modalOpen, setModalOpen] = useState(location.hash.substring(1) || "");

  useEffect(() => {
    const pathname = location.pathname;
    console.log("pathname", pathname);
  }, [location]);

  useEffect(() => {
    if (modalOpen !== "") {
      navigate(`#${modalOpen}`, { replace: true, state: { from: location } });
    } else {
      navigate("", { replace: true, state: { from: location } });
    }
  }, [modalOpen, navigate]);

  //   navigate(location.pathname + "#" + modalOpen, { state: { from: location } });
  // } else {
  //   navigate(location.pathname, { state: { from: location } });
  // }
  // }, [modalOpen, navigate]);

  const handleDownload = () => {
    toast.success("Downloading Resume");
  };

  return (
    <PageParent title="Resume Builder">
      <div className="flex items-center justify-between">
        <div className="relative flex items-center justify-center gap-4">
          <TemplatesSelectionModal
            tabsData={ResumeTemplatesData}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
          <SettingsModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex h-full flex-col gap-2 p-2">
          <AnimatePresence>
            <div className="flex items-center gap-4">
              <motion.div
                className="flex-grow"
                layout
                transition={{ duration: 0.3 }}
              >
                <Dropdown
                  tabsData={tabsData}
                  activeTabResume={activeTabResume}
                  setActiveTabResume={setActiveTabResume}
                />
              </motion.div>
              {state.visibility[activeTabResume] !== undefined && (
                <Toggle
                  onChange={() => handleVisibility(activeTabResume)}
                  checked={state.visibility[activeTabResume]}
                />
              )}
              {options[activeTabResume].add && (
                <button
                  className="rounded-full text-textBrand"
                  onClick={() => {
                    handleAdd(activeTabResume, transformedField);
                  }}
                >
                  <AddCircle size={30} variant="Bulk" />
                </button>
              )}
            </div>
          </AnimatePresence>
          <div className="no-scrollbar max-h-[calc(100vh-192px)] overflow-y-auto rounded-lg">
            <InputForm activeTabResume={activeTabResume} options={options} />
          </div>
        </div>
        <div className="overflow-y-auto p-2 md:col-span-2">
          <div className="mb-2 flex items-center justify-center">
            <div className="flex gap-2 rounded-xl bg-bgSecondary p-2 text-center">
              <button
                className="rounded-md bg-bgActive px-3 py-1 text-textPrimary hover:bg-bgHover active:bg-bgActive"
                onClick={handleDownload}
              >
                Download
              </button>
              <button className="rounded-md bg-bgActive px-3 py-1 text-textPrimary hover:bg-bgHover active:bg-bgActive">
                Print
              </button>
            </div>
          </div>
          <div className="overflow-y-auto sm:h-[calc(100vh-200px)]">
            <ResumePreview
              selectedTemplate={selectedTemplate}
              tabsData={ResumeTemplatesData}
            />
          </div>
        </div>
      </div>
    </PageParent>
  );
};

export const Route = createFileRoute("/_authenticatedLayout/resume-builder")({
  component: ResumeBuilder,
});
