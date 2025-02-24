
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Phone, Mail, TrendingUp, UserPlus, Send, PhoneCall } from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="p-8">
      {/* Metrics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-white">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,234</div>
            <p className="text-xs text-white/60">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-white">Active Deals</CardTitle>
            <TrendingUp className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">45</div>
            <p className="text-xs text-white/60">+5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-white">Won Deals</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">28</div>
            <p className="text-xs text-white/60">+8% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-white">Email Engagement</CardTitle>
            <Mail className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">42%</div>
            <p className="text-xs text-white/60">+3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-slate-800 hover:bg-slate-700 text-white">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
          <Button className="bg-slate-800 hover:bg-slate-700 text-white">
            <Send className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          <Button className="bg-slate-800 hover:bg-slate-700 text-white">
            <PhoneCall className="mr-2 h-4 w-4" />
            Track Call
          </Button>
        </div>
      </div>

      {/* Pipeline Preview */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">Pipeline Overview</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {["New Lead", "Contacted", "Proposal", "Closed"].map((stage) => (
            <Card key={stage} className="bg-slate-900/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-white">{stage}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {Math.floor(Math.random() * 20)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
