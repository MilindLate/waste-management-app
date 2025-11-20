import { useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Upload, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SchedulePickupFormProps {
  onClose: () => void;
}

export default function SchedulePickupForm({ onClose }: SchedulePickupFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    wasteTypes: [] as string[],
    quantity: 'medium',
    customQuantity: '',
    photos: [] as File[],
    address: '123 MG Road, Bangalore - 560001',
    landmark: '',
    preferredDate: undefined as Date | undefined,
    timeSlot: '',
    flexible: false,
    instructions: ''
  });

  const wasteTypeOptions = [
    { id: 'recyclable', label: '♻️ Recyclable (Paper, Plastic, Metal, Glass)' },
    { id: 'household', label: '🗑️ General Household Waste' },
    { id: 'ewaste', label: '🔋 E-Waste (Electronics, Batteries)' },
    { id: 'hazardous', label: '⚠️ Hazardous Waste' },
    { id: 'bulk', label: '📦 Bulk Items (Furniture, Appliances)' },
    { id: 'organic', label: '🌱 Organic/Garden Waste' }
  ];

  const timeSlots = [
    { id: 'early', label: '🌅 Early Morning (6 AM - 9 AM)' },
    { id: 'mid', label: '☀️ Mid Morning (9 AM - 12 PM)' },
    { id: 'afternoon', label: '🌤️ Afternoon (12 PM - 3 PM)' },
    { id: 'evening', label: '🌆 Evening (3 PM - 6 PM)' },
    { id: 'late', label: '🌙 Late Evening (6 PM - 8 PM)' }
  ];

  const handleWasteTypeToggle = (typeId: string) => {
    setFormData(prev => ({
      ...prev,
      wasteTypes: prev.wasteTypes.includes(typeId)
        ? prev.wasteTypes.filter(t => t !== typeId)
        : [...prev.wasteTypes, typeId]
    }));
  };

  const handleSubmit = () => {
    // Validate all required fields
    if (formData.wasteTypes.length === 0) {
      toast.error('Please select at least one waste type');
      return;
    }
    if (!formData.preferredDate) {
      toast.error('Please select a preferred date');
      return;
    }
    if (!formData.timeSlot && !formData.flexible) {
      toast.error('Please select a time slot or mark as flexible');
      return;
    }

    // Simulate submission
    toast.success('Pickup request submitted successfully!');
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-green-600' : 'text-slate-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-600 text-white' : 'bg-slate-200'}`}>
            {step > 1 ? <Check className="w-4 h-4" /> : '1'}
          </div>
          <span className="text-sm">Waste Details</span>
        </div>
        <div className="flex-1 h-px bg-slate-200 mx-4"></div>
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-green-600' : 'text-slate-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-green-600 text-white' : 'bg-slate-200'}`}>
            {step > 2 ? <Check className="w-4 h-4" /> : '2'}
          </div>
          <span className="text-sm">Location & Timing</span>
        </div>
        <div className="flex-1 h-px bg-slate-200 mx-4"></div>
        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-green-600' : 'text-slate-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-green-600 text-white' : 'bg-slate-200'}`}>
            3
          </div>
          <span className="text-sm">Review & Confirm</span>
        </div>
      </div>

      {/* Step 1: Waste Details */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <Label className="mb-4 block">Select Waste Types *</Label>
            <div className="space-y-3">
              {wasteTypeOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={formData.wasteTypes.includes(option.id)}
                    onCheckedChange={() => handleWasteTypeToggle(option.id)}
                  />
                  <Label htmlFor={option.id} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-4 block">Estimated Quantity *</Label>
            <RadioGroup value={formData.quantity} onValueChange={(value) => setFormData(prev => ({ ...prev, quantity: value }))}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small">Small (&lt; 5 kg)</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium (5-20 kg)</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large">Large (&gt; 20 kg)</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Custom</Label>
              </div>
            </RadioGroup>
            {formData.quantity === 'custom' && (
              <Input
                placeholder="Enter quantity in kg"
                className="mt-2"
                value={formData.customQuantity}
                onChange={(e) => setFormData(prev => ({ ...prev, customQuantity: e.target.value }))}
              />
            )}
          </div>

          <div>
            <Label className="mb-2 block">Upload Photos (Optional, up to 3)</Label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 10MB each</p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files).slice(0, 3);
                    setFormData(prev => ({ ...prev, photos: files }));
                  }
                }}
              />
            </div>
            {formData.photos.length > 0 && (
              <div className="mt-2 text-sm text-slate-600">
                {formData.photos.length} photo(s) selected
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Location & Timing */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <Label htmlFor="address" className="mb-2 block">Pickup Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="landmark" className="mb-2 block">Landmark / Additional Instructions</Label>
            <Input
              id="landmark"
              placeholder="e.g., Near City Mall, Blue gate"
              value={formData.landmark}
              onChange={(e) => setFormData(prev => ({ ...prev, landmark: e.target.value }))}
            />
          </div>

          <div>
            <Label className="mb-2 block">Preferred Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.preferredDate ? format(formData.preferredDate, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.preferredDate}
                  onSelect={(date) => setFormData(prev => ({ ...prev, preferredDate: date }))}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>Preferred Time Slot</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flexible"
                  checked={formData.flexible}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, flexible: checked as boolean }))}
                />
                <Label htmlFor="flexible" className="text-sm cursor-pointer">
                  Mark as Flexible
                </Label>
              </div>
            </div>
            <RadioGroup
              value={formData.timeSlot}
              onValueChange={(value) => setFormData(prev => ({ ...prev, timeSlot: value }))}
              disabled={formData.flexible}
            >
              <div className="space-y-2">
                {timeSlots.map((slot) => (
                  <div key={slot.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={slot.id} id={slot.id} />
                    <Label htmlFor={slot.id} className="cursor-pointer">
                      {slot.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="instructions" className="mb-2 block">Special Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Any specific instructions for the collector..."
              value={formData.instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
              rows={3}
            />
          </div>
        </div>
      )}

      {/* Step 3: Review & Confirm */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-lg p-4 space-y-4">
            <div>
              <h3 className="text-slate-900 mb-2">Waste Details</h3>
              <div className="text-slate-600">
                <p><strong>Types:</strong> {formData.wasteTypes.map(t => wasteTypeOptions.find(o => o.id === t)?.label).join(', ')}</p>
                <p><strong>Quantity:</strong> {formData.quantity === 'custom' ? `${formData.customQuantity} kg` : formData.quantity}</p>
                {formData.photos.length > 0 && <p><strong>Photos:</strong> {formData.photos.length} uploaded</p>}
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <h3 className="text-slate-900 mb-2">Location & Timing</h3>
              <div className="text-slate-600">
                <p><strong>Address:</strong> {formData.address}</p>
                {formData.landmark && <p><strong>Landmark:</strong> {formData.landmark}</p>}
                <p><strong>Date:</strong> {formData.preferredDate ? format(formData.preferredDate, 'PPP') : 'Not selected'}</p>
                <p><strong>Time:</strong> {formData.flexible ? 'Flexible' : timeSlots.find(s => s.id === formData.timeSlot)?.label || 'Not selected'}</p>
                {formData.instructions && <p><strong>Instructions:</strong> {formData.instructions}</p>}
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm cursor-pointer">
              I agree to the terms and conditions. I confirm that the waste information provided is accurate and I will be available at the specified time.
            </Label>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-slate-200">
        <Button
          variant="outline"
          onClick={() => {
            if (step > 1) setStep(step - 1);
            else onClose();
          }}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          {step === 1 ? 'Cancel' : 'Back'}
        </Button>

        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            Submit Request
          </Button>
        )}
      </div>
    </div>
  );
}
