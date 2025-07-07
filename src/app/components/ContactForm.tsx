import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { createContact } from "../pages/applications/functions";
import { toast } from "sonner";

export default function ContactForm({ callback }: { callback: () => void }) {
  const handleSubmit = async (formData: FormData) => {
    const result = await createContact(formData);
    if (result.success) {
      toast.success("Contact created successfully");
    } else {
      toast.error("Error creating contact");
      callback();
    }
  };

  return (
    <form action={handleSubmit}>
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
        <Button>
          <Check />
          Create a Contact
        </Button>
      </div>
    </form>
  );
}
