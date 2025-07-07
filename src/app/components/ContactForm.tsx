import { Check } from "lucide-react";
import { SubmitButton } from "./ui/button";
import { createContact } from "../pages/applications/functions";
import { toast } from "sonner";

export default function ContactForm({
  callbackAction,
  companyId = "",
}: {
  callbackAction: () => void;
  companyId?: string;
}) {
  const submitAction = async (formData: FormData) => {
    formData.append("companyId", companyId);
    const result = await createContact(formData);
    if (result.success) {
      toast.success("Contact created successfully");
      callbackAction();
    } else {
      toast.error("Error creating contact");
    }
  };

  return (
    <form action={submitAction}>
      <div className="field">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" required />
      </div>
      <div className="field">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" required />
      </div>
      <div className="field">
        <label htmlFor="role">Role</label>
        <input type="text" id="role" name="role" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="field">
        <SubmitButton>
          <Check />
          Create a Contact
        </SubmitButton>
      </div>
    </form>
  );
}
