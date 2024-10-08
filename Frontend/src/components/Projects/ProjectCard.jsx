import { ArrowDown, Star } from "iconsax-react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Image from "../../components/Image";
import { Popover, PopoverButton, PopoverPanel } from "../../components/Popover";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate({to: `/projects/${project.id}`});
  };

  const techStack = project.techStack || [];

  return (
    <motion.div
      className='flex flex-col sm:flex-row items-center w-full gap-3 p-3 rounded-xl sm:bg-transparent border border-borderPrimary shadow-sm sm:hover:shadow-md transition-shadow'>

      {project.thumbnailUrl && (
        <motion.div
          className="flex-shrink-0 w-full sm:w-24 h-24 rounded-lg overflow-hidden cursor-pointer"
          onClick={handleNavigate}>
          <Image src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>
      )}

      <div className="flex-grow flex flex-col gap-2 justify-evenly w-full">
        <div className="flex gap-2 items-center justify-between">
          <span className="text-lg font-semibold truncate hover:text-brand-700 cursor-pointer" onClick={handleNavigate}>{project.title}</span>
          <div className="flex gap-2 items-center">
            <span className="text-sm hidden sm:block">{project.author}</span>
          </div>
        </div>
        <div className="overflow-hidden">
          <p className="text-sm line-clamp-2 text-textSecondary">{project.description}</p>
        </div>
        <div className="text-sm flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <Star size={20} variant={'TwoTone'} className="mb-1 text-yellow-500" />
            <span className="ml-1">{project.rating}</span>
          </div>
          <div className="flex items-center">
            <ArrowDown size={20} className="mb-1 text-blue-500" />
            <span className="ml-1">{project.downloadCount}</span>
          </div>
          <span className="capitalize truncate w-fit max-w-[30ch]">{project.category}</span>
          <div className="flex items-center gap-2 flex-wrap">
            {techStack.slice(0, 3).map((tech, index) => (
              <span key={index} className="px-1.5 py-1 bg-bgSecondary text-textSecondary rounded-md text-xs">{tech}</span>
            ))}
            {techStack.length > 3 && (
              <Popover className="relative">
                <PopoverButton className="px-1.5 py-1 bg-bgSecondary text-textSecondary rounded-md text-xs">
                  +{techStack.length - 3} more
                </PopoverButton>
                <PopoverPanel className="flex gap-1 flex-wrap whitespace-nowrap max-w-52">
                  {techStack.slice(3).map((tech, index) => (
                    <span key={index} className=" px-1.5 py-1 bg-bgSecondary text-textSecondary rounded-md text-xs">
                      {tech}
                    </span>
                  ))}
                </PopoverPanel>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

