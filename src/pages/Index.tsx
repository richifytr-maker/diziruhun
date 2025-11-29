import { useState } from "react";
import { QuizCard } from "@/components/QuizCard";
import { quizzes } from "@/data/quizzes";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [suggestion, setSuggestion] = useState("");

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
  ); 

const handleSuggestion = async () => {
    if (suggestion.trim()) {
      try {
        const { error } = await supabase
          .from('test_onerileri')
          .insert([{ film_dizi: suggestion.trim() }])
        
        if (error) throw error
        
        toast.success("Öneriniz kaydedildi! Teşekkürler 🎉");
        setSuggestion("");
      } catch (error) {
        console.error('Hata:', error)
        toast.error("Bir hata oluştu, lütfen tekrar deneyin");
      }
    } else {
      toast.error("Lütfen bir öneri yazın");
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/10 sticky top-0 bg-white/10 backdrop-blur-lg z-10 shadow-lg">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Dizi Ruhun
            </h1>
            <div className="text-sm text-white/80 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              {quizzes.length} Test
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <section className="mb-12 text-center animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            En Sevdiğin Diziden Hangi Karaktersin?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Kişilik testlerimizle hangi karaktere benzediğini keşfet! 🎬✨
          </p>

          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
            <Input
              placeholder="Test ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 text-lg bg-white/90 backdrop-blur-sm border-white/20 focus:border-secondary focus:ring-secondary text-primary placeholder:text-primary/60"
            />
          </div>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredQuizzes.map((quiz, index) => (
              <div 
                key={quiz.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className="animate-fade-in"
              >
                <QuizCard
                  id={quiz.id}
                  title={quiz.title}
                  description={quiz.description}
                  icon={quiz.icon}
                  emoji={quiz.emoji}
                />
              </div>
            ))}
          </div>
          {filteredQuizzes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-white/80">
                Aradığınız kriterlere uygun test bulunamadı.
              </p>
            </div>
          )}
        </section>

        <section className="max-w-2xl mx-auto animate-fade-in">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <h3 className="text-2xl font-bold mb-3 text-center text-white">Test Önerisi Gönder</h3>
            <p className="text-white/80 text-center mb-6">
              Hangi dizi veya film için test görmek istersin? Önerini bizimle paylaş!
            </p>
            <div className="flex gap-3">
              <Input
                placeholder="Örn: Prison Break, La Casa de Papel..."
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSuggestion()}
                className="text-base bg-white/90 backdrop-blur-sm border-white/20 text-primary placeholder:text-primary/60"
              />
              <Button onClick={handleSuggestion} size="lg" className="bg-secondary hover:bg-secondary/90 text-white border-none">
                <Send className="w-4 h-4 mr-2" />
                Gönder
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 mt-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-white/70">
          <p>© 2025 <span className="font-semibold text-white">Dizi Ruhun</span>. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
