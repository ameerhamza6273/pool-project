import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, MapPin, Clock, User, Wrench, FileText, Camera,
  Plus, CheckCircle2, Circle, Send, Signature, Truck, DollarSign,
  Phone, MessageSquare, Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { jobs } from "@/lib/data";

const typeColors: Record<string, string> = {
  Maintenance: "bg-[#0891B2]/10 text-[#0891B2]",
  Repair: "bg-[#F59E0B]/10 text-[#F59E0B]",
  Install: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
};

const statusColors: Record<string, string> = {
  Lead: "bg-[#F59E0B]/10 text-[#F59E0B]",
  Booked: "bg-[#0891B2]/10 text-[#0891B2]",
  Dispatched: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
  "In Progress": "bg-[#3B82F6]/10 text-[#3B82F6]",
  Completed: "bg-[#16A34A]/10 text-[#16A34A]",
};

const timelineSteps = [
  { id: "booked", label: "Booked", icon: Circle },
  { id: "en_route", label: "En route", icon: Truck },
  { id: "arrived", label: "Arrived", icon: MapPin },
  { id: "completed", label: "Completed", icon: CheckCircle2 },
];

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="text-center py-20">
        <p className="text-[#64748B]">Job not found</p>
        <Button onClick={() => navigate("/jobs")} className="mt-4 bg-[#0891B2] text-white">Back to Jobs</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/jobs")} className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h1 className="text-xl font-bold text-[#0F172A]">Job {job.id.toUpperCase()}</h1>
            <Badge className={`${typeColors[job.type] || ""} text-[10px] px-1.5 py-0`}>{job.type}</Badge>
            <Badge className={`${statusColors[job.status] || ""} text-[10px] px-1.5 py-0`}>{job.status}</Badge>
          </div>
        </div>
        <Button className="bg-[#16A34A] hover:bg-[#15803D] text-white gap-2 h-9">
          <CheckCircle2 className="w-4 h-4" />
          <span className="hidden sm:inline">Mark Complete & Generate Invoice</span>
          <span className="sm:hidden">Complete</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-[#E2E8F0] shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-[#0F172A]">Job Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0891B2]/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-[#0891B2]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Customer</p>
                    <button
                      onClick={() => navigate(`/customers/${job.customerId}`)}
                      className="font-medium text-[#0F172A] hover:text-[#0891B2] transition-colors"
                    >
                      {job.customerName}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0891B2]/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#0891B2]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Scheduled</p>
                    <p className="font-medium text-[#0F172A]">{job.date} at {job.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0891B2]/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-[#0891B2]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Assigned</p>
                    <div className="flex items-center gap-1.5">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="bg-[#0891B2] text-white text-[10px]">{job.techAvatar}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-[#0F172A]">{job.tech}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0891B2]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#0891B2]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Address</p>
                    <p className="font-medium text-[#0F172A]">{job.address}</p>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                <p className="text-sm font-medium text-[#0F172A] mb-1">Description</p>
                <p className="text-sm text-[#64748B]">{job.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E2E8F0] shadow-sm">
            <CardHeader className="pb-3 flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-[#0F172A]">Line Items</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-[#0891B2]"><Plus className="w-4 h-4" /> Add</Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="divide-y divide-[#F1F5F9]">
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Wrench className="w-4 h-4 text-[#0891B2]" />
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">Labor - {job.type}</p>
                      <p className="text-xs text-[#64748B]">1.5 hrs @ $85/hr</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#0F172A]">$127.50</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#0891B2]" />
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">Parts & Materials</p>
                      <p className="text-xs text-[#64748B]">From inventory</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#0F172A]">$17.50</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-[#0F172A]">Subtotal</span>
                  <span className="font-semibold text-[#0F172A]">$145.00</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-[#64748B]">Tax (8.25%)</span>
                  <span className="text-sm text-[#0F172A]">$11.96</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-base font-semibold text-[#0F172A]">Total</span>
                  <span className="text-base font-bold text-[#0891B2]">$156.96</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E2E8F0] shadow-sm">
            <CardHeader className="pb-3 flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-[#0F172A]">Photos</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-[#0891B2]"><Plus className="w-4 h-4" /> Upload</Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square rounded-lg bg-[#F1F5F9] flex items-center justify-center">
                    <Camera className="w-5 h-5 text-[#64748B]" />
                  </div>
                ))}
                <div className="aspect-square rounded-lg bg-[#F1F5F9] border border-dashed border-[#E2E8F0] flex items-center justify-center cursor-pointer hover:bg-[#E2E8F0]">
                  <Plus className="w-5 h-5 text-[#64748B]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E2E8F0] shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-[#0F172A]">Customer Signature</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-32 rounded-lg bg-[#F1F5F9] border border-dashed border-[#E2E8F0] flex items-center justify-center">
                <div className="text-center">
                  <Signature className="w-6 h-6 text-[#64748B] mx-auto mb-1" />
                  <p className="text-sm text-[#64748B]">Customer signature on completion</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-[#E2E8F0] shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-[#0F172A]">Status Timeline</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-0">
                {timelineSteps.map((step, idx) => {
                  const isComplete =
                    job.stage === "completed" ? true :
                    job.stage === "in_progress" ? idx < 3 :
                    job.stage === "dispatched" ? idx < 2 :
                    job.stage === "booked" ? idx < 1 : false;
                  const isCurrent =
                    job.stage === "completed" ? idx === 3 :
                    job.stage === "in_progress" ? idx === 2 :
                    job.stage === "dispatched" ? idx === 1 :
                    job.stage === "booked" ? idx === 0 : false;
                  const Icon = step.icon;
                  return (
                    <div key={step.id} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isComplete ? "bg-[#16A34A] text-white" : isCurrent ? "bg-[#0891B2] text-white" : "bg-[#F1F5F9] text-[#64748B]"
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {idx < timelineSteps.length - 1 && (
                          <div className={`w-0.5 h-6 ${isComplete ? "bg-[#16A34A]" : "bg-[#E2E8F0]"}`} />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className={`text-sm font-medium ${isComplete || isCurrent ? "text-[#0F172A]" : "text-[#64748B]"}`}>
                          {step.label}
                        </p>
                        {isCurrent && <p className="text-xs text-[#0891B2]">Current</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E2E8F0] shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-[#0F172A]">Automated Notifications</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              {[
                { label: "Booking confirmed", enabled: true },
                { label: "Technician en route", enabled: job.stage === "dispatched" || job.stage === "in_progress" || job.stage === "completed" },
                { label: "Job completed", enabled: job.stage === "completed" },
              ].map((notif) => (
                <div key={notif.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#64748B]" />
                    <Label className="text-sm text-[#0F172A]">{notif.label}</Label>
                  </div>
                  <Switch checked={notif.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-[#E2E8F0] shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-[#0F172A]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2 h-10 border-[#E2E8F0] text-[#0F172A]">
                <Phone className="w-4 h-4 text-[#0891B2]" /> Call Customer
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-10 border-[#E2E8F0] text-[#0F172A]">
                <MessageSquare className="w-4 h-4 text-[#0891B2]" /> Text Customer
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-10 border-[#E2E8F0] text-[#0F172A]">
                <Mail className="w-4 h-4 text-[#0891B2]" /> Email Customer
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-10 border-[#E2E8F0] text-[#0F172A]">
                <DollarSign className="w-4 h-4 text-[#0891B2]" /> View Invoice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
