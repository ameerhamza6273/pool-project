import { useState } from "react";
import { Upload, Users, Plus, BookOpen, MapPin, CreditCard, Mail, MessageSquare, Shield, Bell, CheckCircle2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { teamMembers, integrations, billingHistory, subscriptionPlans } from "@/lib/data";

const roleColors: Record<string, string> = {
  Owner: "bg-[#0891B2]/10 text-[#0891B2]",
  Manager: "bg-[#F59E0B]/10 text-[#F59E0B]",
  Technician: "bg-[#16A34A]/10 text-[#16A34A]",
};

const iconMap: Record<string, React.ElementType> = {
  BookOpen: BookOpen,
  MapPin: MapPin,
  Users: Users,
  MessageSquare: MessageSquare,
  Mail: Mail,
  CreditCard: CreditCard,
};

export default function Settings() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("plan2");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0F172A]">Settings</h1>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="bg-white border border-[#E2E8F0] h-10 p-1 rounded-lg flex-wrap h-auto">
          <TabsTrigger value="company" className="text-sm data-[state=active]:bg-[#0891B2] data-[state=active]:text-white rounded-md px-4 gap-1.5">
            <Globe className="w-4 h-4" /> Company
          </TabsTrigger>
          <TabsTrigger value="team" className="text-sm data-[state=active]:bg-[#0891B2] data-[state=active]:text-white rounded-md px-4 gap-1.5">
            <Users className="w-4 h-4" /> Team
          </TabsTrigger>
          <TabsTrigger value="integrations" className="text-sm data-[state=active]:bg-[#0891B2] data-[state=active]:text-white rounded-md px-4 gap-1.5">
            <Shield className="w-4 h-4" /> Integrations
          </TabsTrigger>
          <TabsTrigger value="billing" className="text-sm data-[state=active]:bg-[#0891B2] data-[state=active]:text-white rounded-md px-4 gap-1.5">
            <CreditCard className="w-4 h-4" /> Billing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-sm data-[state=active]:bg-[#0891B2] data-[state=active]:text-white rounded-md px-4 gap-1.5">
            <Bell className="w-4 h-4" /> Notifications
          </TabsTrigger>
        </TabsList>

        {/* Company Profile */}
        <TabsContent value="company" className="mt-4">
          <Card className="border-[#E2E8F0] shadow-sm">
            <CardContent className="p-5 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#0891B2] flex items-center justify-center">
                  <span className="text-xl font-bold text-white">BC</span>
                </div>
                <div>
                  <Button variant="outline" className="h-9 border-[#E2E8F0] text-[#0F172A] gap-2">
                    <Upload className="w-4 h-4" /> Upload Logo
                  </Button>
                  <p className="text-xs text-[#64748B] mt-1">Recommended: 200x200px PNG</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-[#0F172A]">Company Name</Label>
                  <Input defaultValue="Bryan's Pool Co" className="mt-1 h-10" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#0F172A]">Phone</Label>
                  <Input defaultValue="(512) 555-1000" className="mt-1 h-10" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-sm font-medium text-[#0F172A]">Address</Label>
                  <Input defaultValue="1200 Warehouse Blvd, Austin, TX 78701" className="mt-1 h-10" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#0F172A]">Business Hours</Label>
                  <Input defaultValue="Mon-Fri 7:00 AM - 6:00 PM" className="mt-1 h-10" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#0F172A]">Service Area</Label>
                  <Input defaultValue="Austin, Cedar Park, Round Rock, Pflugerville" className="mt-1 h-10" />
                </div>
              </div>
              <Button className="bg-[#0891B2] hover:bg-[#0E7490] text-white h-10">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team */}
        <TabsContent value="team" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#0891B2] hover:bg-[#0E7490] text-white gap-2 h-10">
                  <Plus className="w-4 h-4" /> Invite User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Invite Team Member</DialogTitle></DialogHeader>
                <div className="space-y-4 pt-2">
                  <div>
                    <Label>Email</Label>
                    <Input className="mt-1" placeholder="team@poolbrayne.com" />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <div className="flex gap-2 mt-2">
                      <Badge className="cursor-pointer bg-[#0891B2]/10 text-[#0891B2]">Owner</Badge>
                      <Badge className="cursor-pointer bg-[#F59E0B]/10 text-[#F59E0B]">Manager</Badge>
                      <Badge className="cursor-pointer bg-[#16A34A]/10 text-[#16A34A]">Technician</Badge>
                    </div>
                  </div>
                  <Button className="w-full bg-[#0891B2] text-white" onClick={() => setInviteOpen(false)}>Send Invite</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-[#64748B] uppercase">User</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-[#64748B] uppercase">Email</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-[#64748B] uppercase">Role</th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-[#64748B] uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((u) => (
                    <tr key={u.id} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F8FAFC]">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-[#0891B2] text-white text-xs">{u.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-[#0F172A]">{u.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#64748B] text-sm">{u.email}</td>
                      <td className="text-center py-3 px-4">
                        <Badge className={`${roleColors[u.role] || "bg-[#E2E8F0] text-[#64748B]"} text-[10px] px-1.5 py-0`}>{u.role}</Badge>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Badge className="bg-[#16A34A]/10 text-[#16A34A] text-[10px] px-1.5 py-0">{u.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {integrations.map((int) => {
              const Icon = iconMap[int.icon] || Shield;
              return (
                <Card key={int.id} className="border-[#E2E8F0] shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[#0891B2]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-[#0F172A]">{int.name}</h3>
                          <Badge className={`${int.status === "Connected" ? "bg-[#16A34A]/10 text-[#16A34A]" : "bg-[#F59E0B]/10 text-[#F59E0B]"} text-[10px] px-1.5 py-0`}>
                            {int.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#64748B] mt-1">{int.description}</p>
                        <Button variant="outline" size="sm" className="mt-3 h-8 border-[#E2E8F0] text-[#0F172A]">
                          {int.status === "Connected" ? "Manage" : "Connect"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-4 p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-sm text-[#64748B]">
            Each client connects their own QuickBooks account — fully isolated per tenant.
          </div>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="mt-4 space-y-4">
          {/* Current Plan */}
          <Card className="border-[#E2E8F0] shadow-sm">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-[#0F172A]">PoolBrayne Pro</h3>
                    <Badge className="bg-[#0891B2]/10 text-[#0891B2] text-[10px] px-1.5 py-0">Current</Badge>
                  </div>
                  <p className="text-sm text-[#64748B]">$299/month via Stripe</p>
                  <p className="text-sm text-[#64748B]">Next billing: July 1, 2024</p>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#64748B]" />
                  <span className="text-sm text-[#0F172A]">Visa ending in 4242</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptionPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`border-[#E2E8F0] shadow-sm cursor-pointer transition-all ${
                  selectedPlan === plan.id ? "ring-2 ring-[#0891B2] border-[#0891B2]" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-[#0F172A]">{plan.name}</h3>
                    {plan.recommended && <Badge className="bg-[#0891B2] text-white text-[10px] px-1.5 py-0">Recommended</Badge>}
                  </div>
                  <p className="text-2xl font-bold text-[#0F172A]">${plan.price}<span className="text-sm font-normal text-[#64748B]">/mo</span></p>
                  <p className="text-sm text-[#64748B] mt-1">{plan.description}</p>
                  <ul className="mt-3 space-y-1.5">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#0F172A]">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-4 h-10 ${
                      selectedPlan === plan.id ? "bg-[#0891B2] text-white" : "bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0]"
                    }`}
                  >
                    {selectedPlan === plan.id ? "Current Plan" : "Select Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Billing History */}
          <Card className="border-[#E2E8F0] shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-[#0F172A]">Billing History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-[#64748B] uppercase">Date</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-[#64748B] uppercase">Description</th>
                      <th className="text-right py-3 px-4 text-xs font-semibold text-[#64748B] uppercase">Amount</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-[#64748B] uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map((bh) => (
                      <tr key={bh.id} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F8FAFC]">
                        <td className="py-3 px-4 text-[#64748B]">{bh.date}</td>
                        <td className="py-3 px-4 text-[#0F172A]">{bh.description}</td>
                        <td className="text-right py-3 px-4 font-semibold text-[#0F172A]">${bh.amount}</td>
                        <td className="text-center py-3 px-4">
                          <Badge className="bg-[#16A34A]/10 text-[#16A34A] text-[10px] px-1.5 py-0">{bh.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-4">
          <Card className="border-[#E2E8F0] shadow-sm">
            <CardContent className="p-5 space-y-4">
              <h3 className="font-semibold text-[#0F172A] mb-2">Customer Notifications</h3>
              {[
                { label: "Booking confirmation", desc: "Send when a job is scheduled" },
                { label: "Technician en route", desc: "Send when tech is dispatched" },
                { label: "Job completion summary", desc: "Send after job is marked complete" },
                { label: "Payment receipt", desc: "Send when payment is received" },
                { label: "Overdue invoice reminder", desc: "Send before invoice due date" },
                { label: "Seasonal campaign", desc: "Send pool opening/closing reminders" },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between py-2 border-b border-[#F1F5F9] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">{n.label}</p>
                    <p className="text-xs text-[#64748B]">{n.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}

              <h3 className="font-semibold text-[#0F172A] mb-2 mt-6">Staff Notifications</h3>
              {[
                { label: "New job assigned", desc: "Notify technician when assigned" },
                { label: "Job overdue alert", desc: "Alert when job exceeds scheduled time" },
                { label: "Low inventory alert", desc: "Alert when stock falls below threshold" },
                { label: "Customer review received", desc: "Notify when new review is posted" },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between py-2 border-b border-[#F1F5F9] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">{n.label}</p>
                    <p className="text-xs text-[#64748B]">{n.desc}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
