
import { Header } from "@/components/Layout/Header";
import { AppSidebar } from "@/components/Layout/AppSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Key, Save, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const { toast } = useToast();
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

  const [splashCursorEnabled, setSplashCursorEnabled] = useState(
    localStorage.getItem("splash_cursor_enabled") === "true"
  );

  const handleSave = () => {
    try {
      Object.entries(apiKeys).forEach(([key, value]) => {
        // Only save if there's a value
        if (value) {
          localStorage.setItem(`${key}_api_key`, value);
        } else {
          // Remove the key if it's empty
          localStorage.removeItem(`${key}_api_key`);
        }
      });

      // Save splash cursor setting
      localStorage.setItem("splash_cursor_enabled", splashCursorEnabled.toString());

      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings.",
        variant: "destructive",
      });
    }
  };

  const toggleVisibility = (key: keyof typeof showKeys) => {
    setShowKeys(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const clearKey = (key: keyof typeof apiKeys) => {
    setApiKeys(prev => ({ ...prev, [key]: "" }));
    localStorage.removeItem(`${key}_api_key`);
    toast({
      title: "API key cleared",
      description: `The ${key} API key has been removed.`,
    });
  };

  // Load saved keys on component mount
  useEffect(() => {
    const loadedKeys = {
      openai: localStorage.getItem("openai_api_key") || "",
      openrouter: localStorage.getItem("openrouter_api_key") || "",
      huggingface: localStorage.getItem("huggingface_api_key") || "",
    };
    setApiKeys(loadedKeys);
    
    // Load splash cursor setting
    setSplashCursorEnabled(localStorage.getItem("splash_cursor_enabled") === "true");
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <AppSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
          <div className="grid gap-6">
            {/* API Keys Section */}
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
                      className="pr-24 bg-slate-800/50 border-white/10 text-white"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {apiKeys.openai && (
                        <button
                          onClick={() => clearKey('openai')}
                          className="text-white/50 hover:text-white/70 text-xs"
                        >
                          Clear
                        </button>
                      )}
                      <button
                        onClick={() => toggleVisibility('openai')}
                        className="text-white/50 hover:text-white/70"
                      >
                        {showKeys.openai ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
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
                      className="pr-24 bg-slate-800/50 border-white/10 text-white"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {apiKeys.openrouter && (
                        <button
                          onClick={() => clearKey('openrouter')}
                          className="text-white/50 hover:text-white/70 text-xs"
                        >
                          Clear
                        </button>
                      )}
                      <button
                        onClick={() => toggleVisibility('openrouter')}
                        className="text-white/50 hover:text-white/70"
                      >
                        {showKeys.openrouter ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
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
                      className="pr-24 bg-slate-800/50 border-white/10 text-white"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {apiKeys.huggingface && (
                        <button
                          onClick={() => clearKey('huggingface')}
                          className="text-white/50 hover:text-white/70 text-xs"
                        >
                          Clear
                        </button>
                      )}
                      <button
                        onClick={() => toggleVisibility('huggingface')}
                        className="text-white/50 hover:text-white/70"
                      >
                        {showKeys.huggingface ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Effects Section */}
            <div className="p-6 bg-slate-900/50 backdrop-blur-md rounded-lg border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-4">Visual Effects</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="splash-cursor" className="text-white">Fluid Cursor Effect</Label>
                    <p className="text-sm text-white/60">Enable fluid dynamic cursor effect (may impact performance)</p>
                  </div>
                  <Switch 
                    id="splash-cursor"
                    checked={splashCursorEnabled}
                    onCheckedChange={setSplashCursorEnabled}
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleSave}
              className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border border-white/10"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
