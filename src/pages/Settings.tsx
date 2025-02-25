
import { Header } from "@/components/Layout/Header";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, Save, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";

const Settings = () => {
  const [apiKeys, setApiKeys] = useState({
    openai: localStorage.getItem("openai_api_key") || "",
    openrouter: localStorage.getItem("openrouter_api_key") || "",
    huggingface: localStorage.getItem("huggingface_api_key") || "",
  });

  const [showKeys, setShowKeys] = useState({
    openai: false,
    openrouter: false,
    huggingface: false,
  });

  const handleSave = () => {
    Object.entries(apiKeys).forEach(([key, value]) => {
      if (value) {
        localStorage.setItem(`${key}_api_key`, value);
      }
    });
  };

  const toggleVisibility = (key: keyof typeof showKeys) => {
    setShowKeys(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <AppSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
          <div className="grid gap-6">
            <div className="p-6 bg-slate-900/50 backdrop-blur-md rounded-lg border border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Key className="h-5 w-5 text-white/70" />
                <h2 className="text-lg font-semibold text-white">API Keys</h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/70">OpenAI API Key</label>
                  <div className="relative">
                    <Input
                      type={showKeys.openai ? "text" : "password"}
                      value={apiKeys.openai}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, openai: e.target.value }))}
                      placeholder="sk-..."
                      className="pr-10 bg-slate-800/50 border-white/10 text-white"
                    />
                    <button
                      onClick={() => toggleVisibility('openai')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/70"
                    >
                      {showKeys.openai ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70">OpenRouter API Key</label>
                  <div className="relative">
                    <Input
                      type={showKeys.openrouter ? "text" : "password"}
                      value={apiKeys.openrouter}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, openrouter: e.target.value }))}
                      placeholder="sk-or-..."
                      className="pr-10 bg-slate-800/50 border-white/10 text-white"
                    />
                    <button
                      onClick={() => toggleVisibility('openrouter')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/70"
                    >
                      {showKeys.openrouter ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70">HuggingFace API Key</label>
                  <div className="relative">
                    <Input
                      type={showKeys.huggingface ? "text" : "password"}
                      value={apiKeys.huggingface}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, huggingface: e.target.value }))}
                      placeholder="hf_..."
                      className="pr-10 bg-slate-800/50 border-white/10 text-white"
                    />
                    <button
                      onClick={() => toggleVisibility('huggingface')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/70"
                    >
                      {showKeys.huggingface ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleSave}
                  className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border border-white/10"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save API Keys
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
