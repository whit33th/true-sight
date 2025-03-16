import React from "react";
import { FieldErrors } from "react-hook-form";
import { AnimatePresence, motion } from "motion/react";

interface InputErrorProps {
  name: string;
  errors: FieldErrors;
}

/**
 * Component to display validation errors for form fields
 * @param name - The field name to check for errors
 * @param errors - The errors object from react-hook-form
 */
const InputError: React.FC<InputErrorProps> = ({ name, errors }) => {
  // Early return if no errors for this field
  if (!errors[name]) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="mt-1 flex items-center text-xs font-medium text-red-500"
      >
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-red-500"></span>
        {errors[name]?.message as string}
      </motion.div>
    </AnimatePresence>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(InputError);
