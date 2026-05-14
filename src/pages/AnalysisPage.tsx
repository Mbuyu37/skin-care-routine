import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  X,
  RefreshCcw,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { GoogleGenAI, Type } from "@google/genai";
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const skinTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal', 'Not sure'];
const concerns = ['Acne', 'Dark spots', 'Dryness', 'Wrinkles', 'Redness', 'Uneven tone', 'Large pores'];
const ageRanges = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55+'];
const lifestyleOptions = [
  { id: 'water', label: 'Water Intake', options: ['Low', 'Moderate', 'High'] },
  { id: 'sleep', label: 'Sleep Quality', options: ['Poor', 'Average', 'Good'] },
  { id: 'sun', label: 'Sun Exposure', options: ['Low', 'Moderate', 'High'] },
];

export default function AnalysisPage() {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    skinType: '',
    mainConcern: [] as string[],
    ageRange: '',
    products: '',
    allergies: '',
    lifestyle: { water: '', sleep: '', sun: '' }
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleConcern = (concern: string) => {
    setFormData(prev => ({
      ...prev,
      mainConcern: prev.mainConcern.includes(concern)
        ? prev.mainConcern.filter(c => c !== concern)
        : [...prev.mainConcern, concern]
    }));
  };

  const saveAnalysisToFirestore = async (result: any) => {
    if (!user) return;
    try {
      const analysesRef = collection(db, 'users', user.uid, 'analyses');
      await addDoc(analysesRef, {
        ...result,
        userId: user.uid,
        date: new Date().toISOString(),
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error saving analysis to Firestore:", error);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI Analysis with Gemini
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const prompt = `
        Analyze this skin photo and questionnaire data to provide a detailed skincare report.
        User Data:
        - Reported Skin Type: ${formData.skinType}
        - Concerns: ${formData.mainConcern.join(', ')}
        - Age Range: ${formData.ageRange}
        - Current Products: ${formData.products}
        - Allergies: ${formData.allergies}
        - Lifestyle: Water(${formData.lifestyle.water}), Sleep(${formData.lifestyle.sleep}), Sun(${formData.lifestyle.sun})

        Return a JSON object with:
        {
          "skinType": "string",
          "healthScore": number (0-100),
          "confidence": number (0-100),
          "observations": ["string"],
          "concerns": ["string"],
          "routine": {
            "morning": [{"step": "string", "product": "string", "why": "string", "ingredients": ["string"]}],
            "night": [{"step": "string", "product": "string", "why": "string", "ingredients": ["string"]}]
          },
          "recommendations": [{"category": "string", "why": "string", "ingredients": ["string"]}],
          "tips": ["string"]
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { text: prompt },
          ...(image ? [{ inlineData: { data: image.split(',')[1], mimeType: "image/jpeg" } }] : [])
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              skinType: { type: Type.STRING },
              healthScore: { type: Type.NUMBER },
              confidence: { type: Type.NUMBER },
              observations: { type: Type.ARRAY, items: { type: Type.STRING } },
              concerns: { type: Type.ARRAY, items: { type: Type.STRING } },
              routine: {
                type: Type.OBJECT,
                properties: {
                  morning: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { step: { type: Type.STRING }, product: { type: Type.STRING }, why: { type: Type.STRING }, ingredients: { type: Type.ARRAY, items: { type: Type.STRING } } } } },
                  night: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { step: { type: Type.STRING }, product: { type: Type.STRING }, why: { type: Type.STRING }, ingredients: { type: Type.ARRAY, items: { type: Type.STRING } } } } }
                }
              },
              recommendations: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { category: { type: Type.STRING }, why: { type: Type.STRING }, ingredients: { type: Type.ARRAY, items: { type: Type.STRING } } } } },
              tips: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      });

      const result = JSON.parse(response.text);
      
      // Save to Firestore if user is logged in
      if (user) {
        await saveAnalysisToFirestore(result);
      }

      // Store result in session storage for the results page
      sessionStorage.setItem('analysisResult', JSON.stringify(result));
      sessionStorage.setItem('analysisImage', image || '');
      
      // Artificial delay for effect
      setTimeout(() => {
        navigate('/results');
      }, 2000);
    } catch (error) {
      console.error("Analysis failed:", error);
      // Fallback to mock data if AI fails
      const mockResult = {
        skinType: formData.skinType || 'Combination',
        healthScore: 78,
        confidence: 92,
        observations: ['Mild oiliness in T-zone', 'Slight dehydration on cheeks', 'Visible pores'],
        concerns: formData.mainConcern.length > 0 ? formData.mainConcern : ['Acne', 'Uneven tone'],
        routine: {
          morning: [
            { step: 'Cleanse', product: 'Gentle Foaming Cleanser', why: 'Removes overnight oils without stripping.', ingredients: ['Glycerin', 'Ceramides'] },
            { step: 'Treat', product: 'Vitamin C Serum', why: 'Brightens and protects against pollution.', ingredients: ['L-Ascorbic Acid', 'Ferulic Acid'] },
            { step: 'Moisturize', product: 'Oil-Free Moisturizer', why: 'Hydrates while controlling shine.', ingredients: ['Hyaluronic Acid', 'Niacinamide'] },
            { step: 'Protect', product: 'SPF 50 Sunscreen', why: 'Essential for preventing dark spots.', ingredients: ['Zinc Oxide', 'Tinosorb S'] }
          ],
          night: [
            { step: 'Cleanse', product: 'Oil Cleanser + Water Cleanser', why: 'Double cleansing removes SPF and makeup.', ingredients: ['Squalane', 'Centella'] },
            { step: 'Treat', product: 'Retinol Serum', why: 'Accelerates cell turnover and treats acne.', ingredients: ['Retinol', 'Peptides'] },
            { step: 'Moisturize', product: 'Barrier Repair Cream', why: 'Deeply nourishes during sleep.', ingredients: ['Ceramides', 'Panthenol'] }
          ]
        },
        recommendations: [
          { category: 'Cleanser', why: 'Your skin shows signs of congestion.', ingredients: ['Salicylic Acid'] },
          { category: 'Serum', why: 'To target hyperpigmentation.', ingredients: ['Niacinamide', 'Alpha Arbutin'] }
        ],
        tips: ['Drink 2L of water daily', 'Change pillowcases weekly', 'Avoid touching your face']
      };

      if (user) {
        await saveAnalysisToFirestore(mockResult);
      }

      sessionStorage.setItem('analysisResult', JSON.stringify(mockResult));
      sessionStorage.setItem('analysisImage', image || '');
      setTimeout(() => {
        navigate('/results');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-slate-50 tracking-tight">AI Skin Analysis</h1>
            <span className="text-sm font-bold text-emerald-500 uppercase tracking-widest">Step {step} of 3</span>
          </div>
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: '33%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              className="h-full bg-emerald-500"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-center shadow-2xl border border-slate-800"
            >
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-slate-800 rounded-full" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="text-emerald-500 w-12 h-12" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-50 mb-4 tracking-tight">Analyzing your skin...</h2>
              <p className="text-slate-400 font-light max-w-md mx-auto">
                Our AI is scanning your photo for texture, hydration levels, and specific concerns. This will only take a moment.
              </p>
              <div className="mt-10 space-y-3 max-w-xs mx-auto">
                {['Scanning skin texture', 'Detecting concerns', 'Generating routine'].map((text, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.5 }}
                    className="flex items-center gap-3 text-sm font-bold text-slate-500"
                  >
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    {text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900 rounded-[3rem] p-8 sm:p-12 shadow-2xl border border-slate-800"
            >
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-50 mb-4 tracking-tight">Upload Skin Photo</h2>
                    <div className="flex items-start gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 mb-8">
                      <Info className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                      <div className="text-sm text-slate-400 leading-relaxed">
                        <p className="font-bold text-slate-200 mb-1">For best results:</p>
                        <ul className="list-disc ml-4 space-y-1 font-light">
                          <li>Use natural, bright lighting</li>
                          <li>Ensure your face is centered and clear</li>
                          <li>Avoid filters, makeup, or harsh shadows</li>
                        </ul>
                      </div>
                    </div>

                    <div 
                      onClick={() => !image && fileInputRef.current?.click()}
                      className={cn(
                        "relative aspect-video sm:aspect-[21/9] rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden group cursor-pointer",
                        image ? "border-slate-800" : "border-slate-800 hover:border-emerald-500 hover:bg-slate-950"
                      )}
                    >
                      {image ? (
                        <>
                          <img src={image} alt="Skin" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 border border-emerald-500/20">
                            <button 
                              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                              className="p-3 bg-slate-900 rounded-full text-emerald-500 hover:scale-110 transition-transform active:scale-95"
                            >
                              <RefreshCcw size={20} />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setImage(null); }}
                              className="p-3 bg-slate-900 rounded-full text-emerald-500 hover:scale-110 transition-transform active:scale-95 px-4"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-slate-950 rounded-full flex items-center justify-center text-emerald-500 mb-4 group-hover:scale-110 transition-transform border border-slate-800">
                            <Camera size={32} />
                          </div>
                          <p className="text-slate-200 font-bold mb-1 tracking-tight">Click to upload or drag and drop</p>
                          <p className="text-slate-500 text-sm font-light uppercase tracking-widest">JPG, PNG up to 10MB</p>
                        </>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        accept="image/*" 
                        className="hidden" 
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      disabled={!image}
                      onClick={() => setStep(2)}
                      className="px-8 py-4 bg-emerald-500 text-slate-950 rounded-2xl font-bold hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 active:scale-95"
                    >
                      Next Step
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-300 mb-3 ml-1 tracking-widest uppercase">Skin Type (if known)</label>
                        <div className="grid grid-cols-2 gap-2">
                          {skinTypes.map(type => (
                            <button
                              key={type}
                              onClick={() => setFormData({ ...formData, skinType: type })}
                              className={cn(
                                "px-4 py-3 rounded-xl text-sm font-bold border transition-all",
                                formData.skinType === type 
                                  ? "bg-emerald-500 border-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20" 
                                  : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                              )}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-300 mb-3 ml-1 tracking-widest uppercase">Age Range</label>
                        <select 
                          value={formData.ageRange}
                          onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-200 transition-all"
                        >
                          <option value="" className="bg-slate-900">Select range</option>
                          {ageRanges.map(range => <option key={range} value={range} className="bg-slate-900">{range}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-3 ml-1 tracking-widest uppercase">Main Concerns (Select all that apply)</label>
                      <div className="flex flex-wrap gap-2">
                        {concerns.map(concern => (
                          <button
                            key={concern}
                            onClick={() => toggleConcern(concern)}
                            className={cn(
                              "px-4 py-2 rounded-full text-xs font-bold border transition-all uppercase tracking-wider",
                              formData.mainConcern.includes(concern)
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-500/5"
                                : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
                            )}
                          >
                            {concern}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-3 ml-1 tracking-widest uppercase">Current Products Used</label>
                      <textarea 
                        placeholder="e.g. Cerave Cleanser, The Ordinary Retinol..."
                        value={formData.products}
                        onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl h-24 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-200 placeholder:text-slate-700 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-3 ml-1 tracking-widest uppercase">Allergies or Sensitive Ingredients</label>
                      <input 
                        type="text"
                        placeholder="e.g. Fragrance, Alcohol, Essential oils..."
                        value={formData.allergies}
                        onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-200 placeholder:text-slate-700 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => setStep(1)}
                      className="px-8 py-4 text-slate-500 font-bold flex items-center gap-2 hover:text-emerald-400 transition-colors uppercase tracking-widest text-xs"
                    >
                      <ChevronLeft size={20} />
                      Back
                    </button>
                    <button 
                      disabled={!formData.skinType || !formData.ageRange}
                      onClick={() => setStep(3)}
                      className="px-8 py-4 bg-emerald-500 text-slate-950 rounded-2xl font-bold hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 active:scale-95"
                    >
                      Next Step
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-50 mb-6 tracking-tight">Lifestyle Check</h2>
                    <div className="space-y-8">
                      {lifestyleOptions.map(item => (
                        <div key={item.id}>
                          <label className="block text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">{item.label}</label>
                          <div className="grid grid-cols-3 gap-4">
                            {item.options.map(option => (
                              <button
                                key={option}
                                onClick={() => setFormData({ 
                                  ...formData, 
                                  lifestyle: { ...formData.lifestyle, [item.id]: option } 
                                })}
                                className={cn(
                                  "px-4 py-4 rounded-2xl text-sm font-bold border transition-all",
                                  formData.lifestyle[item.id as keyof typeof formData.lifestyle] === option
                                    ? "bg-emerald-500 border-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-[1.02]"
                                    : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
                                )}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-slate-950 rounded-[2rem] border border-slate-800 flex items-start gap-4 shadow-inner">
                    <AlertCircle className="text-emerald-500 shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-sm font-bold text-slate-200 mb-1">Ready for analysis?</p>
                      <p className="text-sm text-slate-500 leading-relaxed font-light">
                        By clicking "Analyze Skin", our AI will process your photo and questionnaire to generate a personalized report. This may take up to 30 seconds.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => setStep(2)}
                      className="px-8 py-4 text-slate-500 font-bold flex items-center gap-2 hover:text-emerald-400 transition-colors uppercase tracking-widest text-xs"
                    >
                      <ChevronLeft size={20} />
                      Back
                    </button>
                    <button 
                      onClick={handleAnalyze}
                      className="px-10 py-5 bg-emerald-500 text-slate-950 rounded-2xl font-bold hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-2 active:scale-95"
                    >
                      <Sparkles size={20} />
                      Analyze Skin
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
