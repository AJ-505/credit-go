import os

layouts = {
    "1": """import { Inter } from 'next/font/google';
const font = Inter({ subsets: ['latin'] });
export default function Layout1({ children }: { children: React.ReactNode }) {
  return <div className={font.className}>{children}</div>;
}
""",
    "2": """import { Plus_Jakarta_Sans } from 'next/font/google';
const font = Plus_Jakarta_Sans({ subsets: ['latin'] });
export default function Layout2({ children }: { children: React.ReactNode }) {
  return <div className={font.className}>{children}</div>;
}
""",
    "3": """import { Space_Grotesk } from 'next/font/google';
const font = Space_Grotesk({ subsets: ['latin'] });
export default function Layout3({ children }: { children: React.ReactNode }) {
  return <div className={font.className}>{children}</div>;
}
""",
    "4": """import { Bricolage_Grotesque } from 'next/font/google';
const font = Bricolage_Grotesque({ subsets: ['latin'] });
export default function Layout4({ children }: { children: React.ReactNode }) {
  return <div className={font.className}>{children}</div>;
}
""",
    "5": """import { Playfair_Display } from 'next/font/google';
const font = Playfair_Display({ subsets: ['latin'] });
export default function Layout5({ children }: { children: React.ReactNode }) {
  return <div className={font.className}>{children}</div>;
}
"""
}

for theme_id, content in layouts.items():
    with open(f"src/app/{theme_id}/layout.tsx", "w") as f:
        f.write(content)

print("Created distinct font layouts for all 5 themes!")
