import { PageHeader } from "@/components/PageHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import { useContact } from "@/hooks/use-lab-data";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";

export default function JoinUs() {
  const { toast } = useToast();
  const mutation = useContact();

  const form = useForm<z.infer<typeof insertContactMessageSchema>>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  function onSubmit(data: z.infer<typeof insertContactMessageSchema>) {
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Join Us" 
        description="Opportunities for students, postdocs, and collaborators."
        pattern="dots"
      />

      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info Column */}
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold font-display text-primary mb-6">Open Positions</h2>
              
              <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4 mb-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Postdoctoral Researcher</h3>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">OPEN</span>
                </div>
                <p className="text-muted-foreground">
                  We are looking for candidates for the <span className="font-semibold text-foreground">Canada Postdoctoral Research Award Program</span>.
                  This is a 2-year fully funded position ($70,000/year).
                </p>
                <div className="text-sm space-y-1">
                  <p><strong>Deadlines:</strong></p>
                  <ul className="list-disc list-inside text-muted-foreground ml-2">
                    <li>SSHRC: September 11</li>
                    <li>CIHR: September 17</li>
                    <li>NSERC: October 17</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">PhD Students</h3>
                  <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-bold">ONGOING</span>
                </div>
                <p className="text-muted-foreground">
                  We welcome applications from motivated students interested in mathematical biology, disease modeling, and AI applications.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-primary mb-6">Contact Information</h2>
              <div className="flex items-start gap-4 text-muted-foreground">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">General Inquiries</h4>
                  <p className="mb-2">For general questions about the lab or our research:</p>
                  <a href="mailto:contact@aimmlab.org" className="text-primary hover:underline">contact@aimmlab.org</a>
                </div>
              </div>
            </section>
          </div>

          {/* Form Column */}
          <div className="bg-card border rounded-2xl p-8 shadow-xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-display mb-2">Get in Touch</h2>
              <p className="text-muted-foreground">
                Send us a message and we'll respond to your inquiry shortly.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" type="email" {...field} className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Reason for contact" {...field} className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your research interests or inquiry..." 
                          className="min-h-[150px] bg-background resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full text-lg h-12" 
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
