import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Scissors, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Scissors className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold text-foreground">MyAI Tailor</span>
          </Link>

          {/* Navigation Links */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/" 
                    className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/how-it-works" 
                    className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === '/how-it-works' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    How It Works
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/measurement-tips" 
                    className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === '/measurement-tips' ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    Measurement Tips
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button size="sm">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;