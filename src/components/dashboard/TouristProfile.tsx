import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { User, Bell, MapPin, Globe, Camera } from "lucide-react";

const TouristProfile = () => {
  const [profile, setProfile] = useState({
    name: "Carlos Oliveira",
    email: "carlos@example.com",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos",
    phone: "(11) 98765-4321",
    location: "São Paulo, SP",
    bio: "Apaixonado por trilhas e natureza. Sempre em busca de novas aventuras e experiências autênticas.",
    preferences: {
      adventure: true,
      cultural: true,
      ecotourism: false,
      gastronomic: true,
    },
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
  });

  const handleSave = () => {
    // Here you would typically save the profile to your backend
    console.log("Saving profile:", profile);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm shadow-md border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-emerald-600" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24 border-4 border-emerald-100">
              <AvatarImage src={profile.photo} />
              <AvatarFallback className="bg-emerald-100 text-emerald-800">
                {profile.name[0]}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="flex gap-2 items-center">
              <Camera className="h-4 w-4" />
              Alterar Foto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="border-emerald-100 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="border-emerald-100 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                className="border-emerald-100 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-emerald-600" />
                Localização
              </Label>
              <Input
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
                className="border-emerald-100 focus-visible:ring-emerald-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Sobre Mim</Label>
              <Textarea
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                className="min-h-[100px] border-emerald-100 focus-visible:ring-emerald-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm shadow-md border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-600" />
            Preferências de Viagem
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Turismo de Aventura</Label>
                <p className="text-sm text-muted-foreground">
                  Trilhas, rapel, escalada
                </p>
              </div>
              <Switch
                checked={profile.preferences.adventure}
                onCheckedChange={(checked) =>
                  setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, adventure: checked },
                  })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Turismo Cultural</Label>
                <p className="text-sm text-muted-foreground">
                  Museus, patrimônio histórico, artesanato
                </p>
              </div>
              <Switch
                checked={profile.preferences.cultural}
                onCheckedChange={(checked) =>
                  setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, cultural: checked },
                  })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Ecoturismo</Label>
                <p className="text-sm text-muted-foreground">
                  Observação de fauna e flora, conservação
                </p>
              </div>
              <Switch
                checked={profile.preferences.ecotourism}
                onCheckedChange={(checked) =>
                  setProfile({
                    ...profile,
                    preferences: {
                      ...profile.preferences,
                      ecotourism: checked,
                    },
                  })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Turismo Gastronômico</Label>
                <p className="text-sm text-muted-foreground">
                  Culinária local, vinícolas, cafeterias
                </p>
              </div>
              <Switch
                checked={profile.preferences.gastronomic}
                onCheckedChange={(checked) =>
                  setProfile({
                    ...profile,
                    preferences: {
                      ...profile.preferences,
                      gastronomic: checked,
                    },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm shadow-md border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-emerald-600" />
            Notificações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email</Label>
                <p className="text-sm text-muted-foreground">
                  Receber atualizações por email
                </p>
              </div>
              <Switch
                checked={profile.notifications.email}
                onCheckedChange={(checked) =>
                  setProfile({
                    ...profile,
                    notifications: { ...profile.notifications, email: checked },
                  })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Push</Label>
                <p className="text-sm text-muted-foreground">
                  Notificações no navegador
                </p>
              </div>
              <Switch
                checked={profile.notifications.push}
                onCheckedChange={(checked) =>
                  setProfile({
                    ...profile,
                    notifications: { ...profile.notifications, push: checked },
                  })
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Receber mensagens de texto
                </p>
              </div>
              <Switch
                checked={profile.notifications.sms}
                onCheckedChange={(checked) =>
                  setProfile({
                    ...profile,
                    notifications: { ...profile.notifications, sms: checked },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

export default TouristProfile;
